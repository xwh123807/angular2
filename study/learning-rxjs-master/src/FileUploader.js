"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
// spark-md5 没有第三方 .d.ts 文件，这里用 commonjs 风格的 require 它
// 如果未再 tsconfig.json 中设置 noImplicitAny: true 且 TypeScript 版本大于 2.1 则也可以用
// import * as SparkMD5 from 'spark-md5' 的方式引用
var SparkMD5 = require('spark-md5');
// @warn memory leak
var $attachment = document.querySelector('.attachment');
var $progressBar = document.querySelector('.progress-bar');
var apiHost = 'http://127.0.0.1:5000/api';
var FileUploader = (function () {
    function FileUploader(concurrency) {
        if (concurrency === void 0) { concurrency = 3; }
        var _this = this;
        this.concurrency = concurrency;
        this.file$ = rxjs_1.Observable.fromEvent($attachment, 'change')
            .map(function (r) { return r.target.files[0]; })
            .filter(function (f) { return !!f; });
        this.click$ = rxjs_1.Observable.fromEvent($attachment, 'click')
            .map(function (e) { return e.target; })
            .filter(function (e) { return e === $attachment; })
            .scan(function (acc, val) {
            if (val.classList.contains('glyphicon-paperclip')) {
                return 1;
            }
            if (acc === 2) {
                return 3;
            }
            return 2;
        }, 3)
            .filter(function (v) { return v !== 1; })["do"](function (v) {
            console.log(v);
            if (v === 2) {
                _this.action$.next({ name: 'pause' });
                $attachment.classList.remove('glyphicon-pause');
                $attachment.classList.add('glyphicon-play');
            }
            else {
                _this.action$.next({ name: 'resume' });
                _this.buildPauseIcon();
            }
        })
            .map(function (v) { return ({ action: v === 2 ? 'PAUSE' : 'RESUME', payload: null }); });
        this.action$ = new rxjs_1.Subject();
        this.pause$ = this.action$.filter(function (ac) { return ac.name === 'pause'; });
        this.resume$ = this.action$.filter(function (ac) { return ac.name === 'resume'; });
        this.progress$ = this.action$
            .filter(function (action) { return action.name === 'progress'; })
            .map(function (action) { return action.payload; })
            .distinctUntilChanged(function (x, y) { return x - y >= 0; })["do"](function (r) {
            var percent = Math.round(r * 100);
            $progressBar.style.width = percent + "%";
            $progressBar.firstElementChild.textContent = (percent > 1 ? percent - 1 : percent) + " %";
        })
            .map(function (r) { return ({ action: 'PROGRESS', payload: r }); });
        this.uploadStream$ = this.file$
            .switchMap(this.readFileInfo)
            .switchMap(function (i) { return rxjs_1.Observable.ajax
            .post(apiHost + "/upload/chunk", i.fileinfo)
            .map(function (r) {
            var blobs = _this.slice(i.file, r.response.chunks, r.response.chunkSize);
            return { blobs: blobs, chunkMeta: r.response, file: i.file };
        }); })["do"](function () { return _this.buildPauseIcon(); })
            .switchMap(function (_a) {
            var blobs = _a.blobs, chunkMeta = _a.chunkMeta, file = _a.file;
            var uploaded = [];
            var dists = blobs.map(function (blob, index) {
                var currentLoaded = 0;
                return _this.uploadChunk(chunkMeta, index, blob)["do"](function (r) {
                    currentLoaded = r.loaded / file.size;
                    uploaded[index] = currentLoaded;
                    var percent = uploaded.reduce(function (acc, val) { return acc + (val ? val : 0); });
                    _this.action$.next({ name: 'progress', payload: percent });
                });
            });
            var uploadStream = rxjs_1.Observable.from(dists)
                .mergeAll(_this.concurrency);
            return rxjs_1.Observable.forkJoin(uploadStream)
                .mapTo(chunkMeta);
        })
            .switchMap(function (r) { return rxjs_1.Observable.ajax.post(apiHost + "/upload/chunk/" + r.fileKey)
            .mapTo({
            action: 'UPLOAD_SUCCESS',
            payload: r
        }); })["do"](function () {
            $progressBar.firstElementChild.textContent = '100 %';
            // restore icon
            $attachment.classList.remove('glyphicon-pause');
            $attachment.classList.add('glyphicon-paperclip');
            $attachment.firstElementChild.disabled = false;
        })
            .merge(this.progress$, this.click$);
    }
    // side effect
    FileUploader.prototype.buildPauseIcon = function () {
        $attachment.classList.remove('glyphicon-paperclip');
        $attachment.classList.add('glyphicon-pause');
        $attachment.firstElementChild.disabled = true;
    };
    FileUploader.prototype.readFileInfo = function (file) {
        var reader = new FileReader();
        var spark = new SparkMD5.ArrayBuffer();
        reader.readAsArrayBuffer(file);
        return rxjs_1.Observable.create(function (observer) {
            reader.onload = function (e) {
                spark.append(e.target.result);
                var fileMD5 = spark.end();
                observer.next({
                    file: file, fileinfo: {
                        fileMD5: fileMD5, fileSize: file.size,
                        lastUpdated: file.lastModifiedDate.toISOString(),
                        fileName: file.name
                    }
                });
                observer.complete();
            };
            return function () {
                if (!reader.result) {
                    console.warn('read file aborted');
                    reader.abort();
                }
            };
        });
    };
    FileUploader.prototype.slice = function (file, n, chunkSize) {
        var result = [];
        for (var i = 0; i < n; i++) {
            var startSize = i * chunkSize;
            var slice = file.slice(startSize, i === n - 1 ? startSize + (file.size - startSize) : (i + 1) * chunkSize);
            result.push(slice);
        }
        return result;
    };
    FileUploader.prototype.uploadChunk = function (meta, index, blob) {
        var _this = this;
        var host = apiHost + "/upload/chunk/" + meta.fileKey + "?chunk=" + (index + 1) + "&chunks=" + meta.chunks;
        return rxjs_1.Observable.create(function (subscriber) {
            var ajax$ = rxjs_1.Observable.ajax({
                url: host,
                body: blob,
                method: 'post',
                crossDomain: true,
                headers: { 'Content-Type': 'application/octet-stream' },
                progressSubscriber: subscriber
            })
                .takeUntil(_this.pause$)
                .repeatWhen(function () { return _this.resume$; });
            var subscription = ajax$.subscribe();
            return function () { return subscription.unsubscribe(); };
        })
            .retryWhen(function () { return _this.resume$; });
    };
    return FileUploader;
}());
exports.FileUploader = FileUploader;
