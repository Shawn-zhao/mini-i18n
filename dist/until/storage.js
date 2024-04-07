"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._storage = void 0;
var env_1 = require("./env");
var _storage = function (handler, lang) {
    if (env_1._env === 'wechat' || env_1._env === 'baidu' || env_1._env === 'qq' || env_1._env === 'jd' || env_1._env === 'bytedance') {
        return _publicStorage(handler, lang);
    }
    else if (env_1._env === 'alipay') {
        return _alipayStorage(handler, lang);
    }
    else if (env_1._env === 'browser') {
        return _browserStorage(handler, lang);
    }
    else {
        console.error('不支持当前环境');
    }
};
exports._storage = _storage;
function _publicStorage(h, lang) {
    if (h === 'get') {
        try {
            var res = env_1.ty.getStorageSync('ty_locale');
            if (res) {
                return res;
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    else if (h === 'set') {
        env_1.ty.setStorage({
            key: 'ty_locale',
            data: lang
        });
    }
    else {
        _errorLog('_wxStorage');
    }
}
function _alipayStorage(h, lang) {
    if (h === 'get') {
        try {
            var res = env_1.ty.getStorageSync({ key: 'ty_locale' });
            if (!res.error) {
                return res.data;
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    else if (h === 'set') {
        env_1.ty.setStorage({
            key: 'ty_locale',
            data: lang
        });
    }
    else {
        _errorLog('_alipayStorage');
    }
}
function _browserStorage(h, lang) {
    if (h === 'get') {
        return localStorage.getItem('ty_locale');
    }
    else if (h === 'set') {
        localStorage.setItem('ty_locale', lang || '');
    }
}
function _errorLog(p) {
    throw "".concat(p, ": Please check params");
}
