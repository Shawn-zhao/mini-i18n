"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._env = exports.ty = void 0;
function getEnv() {
    if (typeof wx !== 'undefined' && wx.getSystemInfo) {
        exports.ty = wx;
        return 'wechat';
    }
    else if (typeof my !== 'undefined' && my.getSystemInfo) {
        exports.ty = my;
        return 'alipay';
    }
    else if (typeof tt !== 'undefined' && tt.getSystemInfo) {
        exports.ty = tt;
        return 'bytedance';
    }
    else if (typeof swan !== 'undefined' && swan.getSystemInfo) {
        exports.ty = swan;
        return 'baidu';
    }
    else if (typeof qq !== 'undefined' && qq.getSystemInfo) {
        exports.ty = qq;
        return 'qq';
    }
    else if (typeof jd !== 'undefined' && jd.getSystemInfo) {
        exports.ty = jd;
        return 'jd';
    }
    else if (typeof window !== 'undefined') {
        return 'browser';
    }
    else {
        console.error('_env: 不支持当前环境');
    }
}
exports._env = getEnv();
