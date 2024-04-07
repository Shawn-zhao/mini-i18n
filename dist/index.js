"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.order = exports.i18n = void 0;
var until_1 = require("./until");
var common_1 = require("./until/common");
var merge_1 = __importDefault(require("./until/merge"));
var I18n = (function () {
    function I18n() {
        this.allLangData = Object.create(null);
        this.lang = 'en-US';
        this.defualtLang = 'en-US';
        this.langTag = 'en';
        this.defualtLangTag = 'en';
        this.themeColor = '#000';
        this.homePath = '';
        this.isVerifiyApi = false;
        this.isHint = false;
    }
    I18n.prototype.init = function (config) {
        console.log('mini-i18n init...');
        this.isVerifiyApi = config.isVerifiyApi || this.isVerifiyApi;
        this.isVerifiyApi && (0, until_1._canIUse)();
        this.themeColor = config.themeColor || this.themeColor;
        this.allLangData = config.locales || Object.create(null);
        this.defualtLang = config.defualtLang || this.defualtLang;
        this.defualtLangTag = this._formatLanguageTag(this.defualtLang) || this.defualtLangTag;
        var localLang = (0, until_1._storage)('get');
        this.lang = config.lang || localLang || (0, until_1.getLang)() || this.defualtLang;
        this.langTag = this._formatLanguageTag(this.lang);
        (0, until_1._storage)('set', this.lang);
        !!config.isHint && (0, until_1._listener)(this);
        this.homePath = config.homePath || this.homePath;
        if (!config.locales[this._formatLanguageTag(this.defualtLang)]) {
            throw "\u9ED8\u8BA4\u8BED\u8A00 \u2018".concat(this.defualtLang, "\u2019 \u7684\u6587\u4EF6\u4E0D\u5B58\u5728, \u8BF7\u68C0\u67E5\u591A\u8BED\u8A00\u6587\u4EF6\u914D\u7F6E\u662F\u5426\u6B63\u786E");
        }
    };
    I18n.prototype.getLocales = function () {
        return (0, until_1._storage)('get') || this.lang;
    };
    I18n.prototype.getEnv = function () {
        return until_1._env;
    };
    I18n.prototype.getLanguagePackList = function () {
        return Object.keys(this.allLangData);
    };
    I18n.prototype.setLocales = function (_a) {
        var lang = _a.lang, _b = _a.isReload, isReload = _b === void 0 ? false : _b, _c = _a.path, path = _c === void 0 ? '' : _c, _d = _a.query, query = _d === void 0 ? {} : _d;
        (0, until_1._storage)('set', lang);
        this.lang = lang;
        this.langTag = this._formatLanguageTag(lang);
        console.log('setLocales', { lang: lang, isReload: isReload });
        isReload && (0, until_1._reload)(this, { path: path, query: query });
    };
    I18n.prototype.updateLocale = function (_a) {
        var locales = _a.locales, _b = _a.isReload, isReload = _b === void 0 ? false : _b, _c = _a.isAnalyticalData, isAnalyticalData = _c === void 0 ? true : _c, _d = _a.mark, mark = _d === void 0 ? '.' : _d, _e = _a.path, path = _e === void 0 ? '' : _e, _f = _a.query, query = _f === void 0 ? {} : _f;
        var data = isAnalyticalData ? common_1.dealData.analyticalData(locales, mark) : locales;
        this.allLangData = (0, merge_1.default)(this.allLangData, data);
        console.log('updateLocale', { locales: locales, isReload: isReload, isAnalyticalData: isAnalyticalData, mark: mark }, this.allLangData);
        isReload && (0, until_1._reload)(this, { path: path, query: query });
    };
    I18n.prototype._formatLanguageTag = function (s) {
        var lang = s.includes('_') ? s.replace('_', '-').toLowerCase() : s.toLowerCase();
        if (until_1.region[lang]) {
            return until_1.region[lang];
        }
        return this.defualtLangTag;
    };
    return I18n;
}());
exports.i18n = new I18n();
var order = function (staticS, dynamicS, s) {
    s = s ? s : '%';
    if (staticS.includes(s)) {
        return staticS.replace(s, dynamicS.toString());
    }
    return staticS;
};
exports.order = order;
var t = function (id, dynamicS, s) {
    var locales = exports.i18n.allLangData[exports.i18n.langTag];
    var defualtLocales = exports.i18n.allLangData[exports.i18n.defualtLangTag];
    var arr = id.split('.');
    if (Object.prototype.toString.call(locales) === '[object Object]' && Object.keys(locales).length !== 0) {
        try {
            var str = (0, common_1.getValue)(locales, arr);
            if (str) {
                if (dynamicS !== undefined)
                    return (0, exports.order)(str, dynamicS, s);
                return str;
            }
            else {
                console.warn("mini-i18n: \u8BED\u8A00\u5305 ".concat(exports.i18n.langTag, " \u4E2D\u7684 key\uFF1A").concat(id, " \u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u63A5\u8BCD\u6761"));
                return arr[arr.length - 1];
            }
        }
        catch (err) {
            console.warn(err);
            return arr[arr.length - 1];
        }
    }
    console.warn("mini-i18n: \u8BED\u8A00\u5305 ".concat(exports.i18n.langTag, " \u5185\u5BB9\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u63A5\u53E3\u6216\u672C\u5730\u6587\u4EF6\u5185\u5BB9"));
    if (Object.prototype.toString.call(defualtLocales) === '[object Object]' &&
        Object.keys(defualtLocales).length !== 0) {
        try {
            var str = (0, common_1.getValue)(locales, arr);
            if (str) {
                if (dynamicS !== undefined)
                    return (0, exports.order)(str, dynamicS, s);
                return str;
            }
            else {
                console.warn("mini-i18n: \u515C\u5E95\u8BED\u8A00\u5305 ".concat(exports.i18n.defualtLangTag, " \u4E2D\u7684 key\uFF1A").concat(id, " \u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u63A5\u8BCD\u6761"));
                return arr[arr.length - 1];
            }
        }
        catch (err) {
            console.warn(err);
            return arr[arr.length - 1];
        }
    }
    console.warn("mini-i18n: \u8BED\u8A00\u5305 ".concat(exports.i18n.defualtLangTag, " \u5185\u5BB9\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u63A5\u53E3\u6216\u672C\u5730\u6587\u4EF6\u5185\u5BB9"));
    return arr[arr.length - 1];
};
exports.t = t;
