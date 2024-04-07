"use strict";
var merge = function (target, source) {
    return deep(target, source);
};
var deep = function (target, source) {
    Object.keys(source).forEach(function (item, index) {
        if (!isObject(source[item])) {
            target[item] = source[item];
        }
        else {
            deep(target[item], source[item]);
        }
    });
    return target;
};
var isObject = function (item) {
    return Object.prototype.toString.call(item) === '[object Object]';
};
module.exports = merge;
