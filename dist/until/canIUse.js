"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._canIUse = void 0;
var env_1 = require("./env");
var apiVerify = {
    public: {
        'getSystemInfoSync': 'getSystemInfoSync',
        'showModal': 'showModal',
        'onAppShow': 'onAppShow',
        'reLaunch': 'reLaunch',
        'getStorageSync': 'getStorageSync',
        'setStorage': 'setStorage'
    },
    alipay: {
        'env': 'env.language',
        'confirm': 'confirm'
    }
};
var _canIUse = function () {
    if (env_1._env === 'wechat' || env_1._env === 'baidu' || env_1._env === 'qq' || env_1._env === 'jd' || env_1._env === 'bytedance') {
        Object.keys(apiVerify.public).forEach(function (item, index) {
            if (!env_1.ty.canIUse(apiVerify.public[item])) {
                throw "".concat(item, " \u4E0D\u652F\u6301\u5F53\u524D\u7248\u672C\uFF0C\u8BF7\u5347\u7EA7\u5230\u652F\u6301 Api ").concat(item, " \u7684\u57FA\u7840\u5E93\u6216\u5F00\u53D1\u5DE5\u5177\u5230\u6307\u5B9A\u7248\u672C\u3002");
            }
        });
        console.log('mini-i18n: Api 在当前环境可用');
    }
    else if (env_1._env === 'alipay') {
        Object.keys(apiVerify).forEach(function (item, index) {
            Object.keys(apiVerify[item]).forEach(function (it, id) {
                if (!env_1.ty.canIUse(apiVerify[item][it])) {
                    throw "".concat(it, " \u4E0D\u652F\u6301\u5F53\u524D\u7248\u672C\uFF0C\u8BF7\u5347\u7EA7\u5230\u652F\u6301 Api ").concat(it, " \u7684\u57FA\u7840\u5E93\u6216\u5F00\u53D1\u5DE5\u5177\u5230\u6307\u5B9A\u7248\u672C\u3002");
                }
            });
        });
        console.log('mini-i18n: Api 在当前环境可用');
    }
    else {
        console.error('mini-i18n: 不支持当前环境');
    }
};
exports._canIUse = _canIUse;
