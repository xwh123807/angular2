"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var dbIndex = 0;
var searchStorage = new Map();
var random = function (begin, end) {
    return begin + Math.floor((end - begin) * Math.random()) + 1;
};
exports.search = function (inputValue) {
    return rxjs_1.Observable.create(function (observer) {
        var status = 'pending';
        var timmer = setTimeout(function () {
            var result = null;
            for (var _i = 0, searchStorage_1 = searchStorage; _i < searchStorage_1.length; _i++) {
                var _a = searchStorage_1[_i], key = _a[0], data = _a[1];
                if (data.value === inputValue) {
                    result = data;
                    break;
                }
            }
            status = 'done';
            observer.next(result);
            observer.complete();
        }, random(400, 1200));
        return function () {
            clearTimeout(timmer);
            if (status === 'pending') {
                console.warn('search canceled');
            }
        };
    });
};
exports.mockHttpPost = function (value) {
    return rxjs_1.Observable.create(function (observer) {
        var status = 'pending';
        var timmer = setTimeout(function () {
            var result = {
                _id: ++dbIndex, value: value,
                isDone: false
            };
            searchStorage.set(result._id, result);
            status = 'done';
            observer.next(result);
            observer.complete();
        }, random(10, 1000));
        return function () {
            clearTimeout(timmer);
            if (status === 'pending') {
                console.warn('post canceled');
            }
        };
    });
};
exports.mockToggle = function (id, isDone) {
    return rxjs_1.Observable.create(function (observer) {
        var status = 'pending';
        var timmer = setTimeout(function () {
            var result = searchStorage.get(parseInt(id));
            result.isDone = !isDone;
            searchStorage.set(result._id, result);
            status = 'done';
            observer.next(result);
            observer.complete();
        }, random(10, 1000));
        return function () {
            clearTimeout(timmer);
            if (status === 'pending') {
                console.warn('post canceled');
            }
        };
    });
};
exports.mockDelete = function (id) {
    return rxjs_1.Observable.create(function (observer) {
        var status = 'pending';
        var timmer = setTimeout(function () {
            searchStorage["delete"](id);
            status = 'done';
            observer.next(true);
            observer.complete();
        }, random(10, 1000));
        return function () {
            clearTimeout(timmer);
            if (status === 'pending') {
                console.warn('delete canceled');
            }
        };
    });
};
exports.createTodoItem = function (data) {
    var result = document.createElement('LI');
    result.classList.add('list-group-item', "todo-item-" + data._id);
    result.setAttribute('data-id', "" + data._id);
    var innerHTML = "\n    " + data.value + "\n    <button type=\"button\" class=\"btn btn-default button-remove pull-right\" aria-label=\"right Align\">\n      <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n    </button>\n  ";
    result.innerHTML = innerHTML;
    return result;
};
