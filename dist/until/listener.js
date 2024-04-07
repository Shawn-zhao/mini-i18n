"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._listener = void 0;
var until_1 = require("../until");
var hint_1 = require("./hint");
var _listener = function (i18n) {
    if (until_1._env === 'wechat' || until_1._env === 'baidu' || until_1._env === 'qq' || until_1._env === 'jd' || until_1._env === 'bytedance' || until_1._env === 'alipay') {
        _publicListener(i18n);
    }
    else if (until_1._env === 'browser') {
    }
    else {
        console.error('_listener: 不支持当前环境');
    }
};
exports._listener = _listener;
function _publicListener(i18n) {
    until_1.ty.onAppShow(function (res) {
        (0, hint_1._hint)(i18n);
    });
}
