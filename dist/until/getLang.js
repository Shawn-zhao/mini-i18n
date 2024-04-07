"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLang = void 0;
var env_1 = require("./env");
var getLang = function () {
    if (env_1._env === 'wechat' || env_1._env === 'baidu' || env_1._env === 'qq' || env_1._env === 'jd' || env_1._env === 'bytedance') {
        return _publicLang();
    }
    else if (env_1._env === 'alipay') {
        return _alipayLang();
    }
    else if (env_1._env === 'browser') {
        window.navigator.language || '';
    }
    else {
        console.error('不支持当前环境');
    }
};
exports.getLang = getLang;
function _publicLang() {
    return env_1.ty.getSystemInfoSync().language;
}
function _alipayLang() {
    return env_1.ty.env.language || '';
}
