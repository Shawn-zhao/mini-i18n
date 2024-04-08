"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._hint = void 0;
var until_1 = require("../until");
var _hint = function (i18n) {
    if (until_1._env === 'wechat' || until_1._env === 'baidu' || until_1._env === 'qq' || until_1._env === 'jd' || until_1._env === 'bytedance') {
        _publicHint(i18n);
    }
    else if (until_1._env === 'alipay') {
        _alipayHint(i18n);
    }
    else if (until_1._env === 'browser') {
        window.location.reload();
    }
    else {
        console.error('不支持当前环境');
    }
};
exports._hint = _hint;
function _publicHint(i18n) {
    var langList = i18n.getLanguagePackList();
    var sysLang = (0, until_1.getLang)();
    var tag = i18n._formatLanguageTag(sysLang);
    var isChinese = tag === 'zh-Hans';
    var index = langList.findIndex(function (item) { return item === tag; });
    if (sysLang !== i18n.lang) {
        if (index !== -1) {
            until_1.ty.showModal({
                title: isChinese ? '提示' : 'Hint',
                cancelText: isChinese ? '取消' : 'Cancel',
                confirmText: isChinese ? '切换' : 'Switch',
                confirmColor: i18n.themeColor,
                content: isChinese ? "\u5F53\u524D\u7CFB\u7EDF\u8BED\u8A00\u4E3A".concat(sysLang, "\uFF0C\u662F\u5426\u5207\u6362\uFF1F") : "\n        The current system language is ".concat(sysLang, ", do you want to switch?"),
                success: function (res) {
                    if (res.confirm) {
                        i18n.setLocales({ lang: sysLang, isReload: true });
                    }
                    else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        }
        else if (i18n.lang !== i18n._formatLanguageTag(i18n.defualtLang)) {
            until_1.ty.showModal({
                title: isChinese ? '提示' : 'Hint',
                cancelText: isChinese ? '取消' : 'Cancel',
                confirmText: isChinese ? '切换' : 'Switch',
                confirmColor: i18n.themeColor,
                content: isChinese ? "\u4E0D\u652F\u6301\u5F53\u524D\u7CFB\u7EDF\u8BED\u8A00".concat(sysLang, "\uFF0C\u662F\u5426\u5207\u6362\u4E3A\u82F1\u6587\uFF1F") : "\n        The current system language ".concat(sysLang, " is not supported, should you switch to English?"),
                success: function (res) {
                    if (res.confirm) {
                        i18n.setLocales(i18n.defualtLang);
                    }
                    else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        }
    }
}
function _alipayHint(i18n) {
    var isChinese = i18n.langTag === 'zh-Hans';
    var langList = i18n.getLanguagePackList();
    var sysLang = (0, until_1.getLang)();
    var tag = i18n._formatLanguageTag(sysLang);
    var index = langList.findIndex(function (item) { return item === tag; });
    if (sysLang !== i18n.lang) {
        if (index !== -1) {
            until_1.ty.confirm({
                title: isChinese ? '提示' : 'Hint',
                cancelButtonText: isChinese ? '取消' : 'Cancel',
                confirmButtonText: isChinese ? '切换' : 'Switch',
                content: isChinese ? "\u5F53\u524D\u7CFB\u7EDF\u8BED\u8A00\u4E3A".concat(sysLang, "\uFF0C\u662F\u5426\u5207\u6362\uFF1F") : "\n        The current system language is ".concat(sysLang, ", do you want to switch?"),
                success: function (res) {
                    if (res.confirm) {
                        i18n.setLocales(sysLang);
                    }
                    else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        }
        else if (i18n.lang !== i18n._formatLanguageTag(i18n.defualtLang)) {
            until_1.ty.confirm({
                title: isChinese ? '提示' : 'Hint',
                cancelButtonText: isChinese ? '取消' : 'Cancel',
                confirmButtonText: isChinese ? '切换' : 'Switch',
                content: isChinese ? "\u4E0D\u652F\u6301\u5F53\u524D\u7CFB\u7EDF\u8BED\u8A00".concat(sysLang, "\uFF0C\u662F\u5426\u5207\u6362\u4E3A\u82F1\u6587\uFF1F") : "\n        The current system language ".concat(sysLang, " is not supported, should you switch to English?"),
                success: function (res) {
                    if (res.confirm) {
                        i18n.setLocales(i18n.defualtLang);
                    }
                    else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        }
    }
}
