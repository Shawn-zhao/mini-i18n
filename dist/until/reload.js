"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._reload = void 0;
var env_1 = require("./env");
var _reload = function (i18n, options) {
    switch (env_1._env) {
        case 'wechat':
            _wxReload(i18n, options);
            break;
        case 'alipay':
            _alipayReload(options);
            break;
        case 'baidu':
            _wxReload(i18n, options);
            break;
        case 'qq':
            _wxReload(i18n, options);
            break;
        case 'jd':
            _wxReload(i18n, options);
            break;
        case 'bytedance':
            _wxReload(i18n, options);
            break;
        case 'browser':
            window.location.reload();
        default:
            console.error('i18n_reload不支持当前环境:', env_1._env);
            break;
    }
};
exports._reload = _reload;
function _wxReload(i18n, options) {
    var path = options.path ? options.path : i18n.homePath;
    var query = options.query;
    console.log('reload', path);
    var isQuery = query && Object.keys(query).length !== 0;
    env_1.ty.redirectTo({
        url: isQuery ? joinUrl(path, query) : path,
        fail: function (err) {
            console.warn('_reload_redirectTo', {
                _env: env_1._env,
                err: err,
                log: "path:".concat(path, " \u975Etabbar\u9875\u9762, \u5373\u5C06\u4F7F\u7528 reLaunch \u8DF3\u8F6C\u9875\u9762\uFF1A"),
                path: path,
                query: query,
            });
            env_1.ty.reLaunch({
                url: path,
                fail: function (err) {
                    console.warn('_reload_reLaunch:', {
                        _env: env_1._env,
                        err: err,
                        path: path,
                        query: query,
                    });
                },
            });
        },
    });
}
function _alipayReload(options) {
    var path = options.path ? options.path : i18n.homePath;
    var query = options.query;
    var isQuery = query && Object.keys(query).length !== 0;
    env_1.ty.redirectTo({
        url: isQuery ? joinUrl(path, query) : path,
        fail: function (err) {
            console.warn('_reload_redirectTo', {
                _env: env_1._env,
                err: err,
                path: path,
                query: query,
            });
        },
    });
}
function joinUrl(route, params) {
    var queryLength = Object.keys(params).length;
    var url = route + (queryLength !== 0 ? '?' : '');
    Object.keys(params).forEach(function (item, index) {
        url += item + '=' + params[item] + (index === queryLength - 1 ? '' : '&');
    });
    return url;
}
