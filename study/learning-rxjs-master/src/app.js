"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var lib_1 = require("./lib");
var FileUploader_1 = require("./FileUploader");
var $input = document.querySelector('.todo-val');
var $list = document.querySelector('.list-group');
var $add = document.querySelector('.button-add');
var type$ = rxjs_1.Observable.fromEvent($input, 'keydown')
    .publish()
    .refCount();
var enter$ = type$
    .filter(function (r) { return r.keyCode === 13; });
var clickAdd$ = rxjs_1.Observable.fromEvent($add, 'click');
var input$ = enter$.merge(clickAdd$);
var clearInputSubject$ = new rxjs_1.Subject();
var item$ = input$
    .map(function () { return $input.value; })
    .filter(function (r) { return r !== ''; })
    .distinct(null, clearInputSubject$)
    .switchMap(lib_1.mockHttpPost)
    .map(lib_1.createTodoItem)["do"](function (ele) {
    $list.appendChild(ele);
    $input.value = '';
    clearInputSubject$.next();
})
    .publishReplay(1)
    .refCount();
var toggle$ = item$.mergeMap(function ($todoItem) {
    return rxjs_1.Observable.fromEvent($todoItem, 'click')
        .debounceTime(300)
        .filter(function (e) { return e.target === $todoItem; })
        .mapTo({
        data: {
            _id: $todoItem.dataset['id'],
            isDone: $todoItem.classList.contains('done')
        }, $todoItem: $todoItem
    });
})
    .switchMap(function (result) {
    return lib_1.mockToggle(result.data._id, result.data.isDone)
        .mapTo(result.$todoItem);
})["do"](function ($todoItem) {
    if ($todoItem.classList.contains('done')) {
        $todoItem.classList.remove('done');
    }
    else {
        $todoItem.classList.add('done');
    }
});
var remove$ = item$.mergeMap(function ($todoItem) {
    var $removeButton = $todoItem.querySelector('.button-remove');
    return rxjs_1.Observable.fromEvent($removeButton, 'click')
        .mapTo($todoItem);
})["do"](function ($todoItem) {
    // 从 DOM 上移掉 todo item
    var $parent = $todoItem.parentNode;
    $parent.removeChild($todoItem);
});
var search$ = type$.debounceTime(200)
    .filter(function (evt) { return evt.keyCode !== 13; })
    .map(function (result) { return result.target.value; })
    .switchMap(lib_1.search)["do"](function (result) {
    var actived = document.querySelectorAll('.active');
    Array.prototype.forEach.call(actived, function (item) {
        item.classList.remove('active');
    });
    if (result) {
        var item = document.querySelector(".todo-item-" + result._id);
        item.classList.add('active');
    }
});
var uploader = new FileUploader_1.FileUploader();
var app$ = toggle$.merge(remove$, search$, uploader.uploadStream$)["do"](function (r) {
    console.log(r);
});
app$.subscribe();
