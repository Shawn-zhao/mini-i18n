"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.dealData = void 0;
var merge_1 = __importDefault(require("./merge"));
var AnalyticalData = (function () {
    function AnalyticalData() {
        this.newData = {};
    }
    AnalyticalData.prototype.analyticalData = function (data, mark) {
        var _this = this;
        Object.keys(data).forEach(function (item, index) {
            _this.newData[item] = {};
            var obj = {};
            Object.keys(data[item]).forEach(function (it, id) {
                var o = _this.stringToObject({ key: it, value: data[item][it], mark: mark });
                (0, merge_1.default)(obj, o);
            });
            _this.newData[item] = obj;
        });
        return this.newData;
    };
    AnalyticalData.prototype.stringToObject = function (_a) {
        var key = _a.key, value = _a.value, mark = _a.mark;
        var arr = key.split(mark);
        var l = arr.length;
        var obj = {};
        if (l > 1 && obj[arr[0]] === undefined) {
            obj[arr[0]] = {};
        }
        else if (l === 1) {
            obj[arr[0]] = value;
        }
        if (l > 2 && obj[arr[0]][arr[1]] === undefined) {
            obj[arr[0]][arr[1]] = {};
        }
        else if (l === 2) {
            obj[arr[0]][arr[1]] = value;
        }
        if (l === 3) {
            obj[arr[0]][arr[1]][arr[2]] = value;
        }
        return obj;
    };
    return AnalyticalData;
}());
exports.dealData = new AnalyticalData();
var getValue = function (locales, arr) {
    var obj = locales;
    arr.forEach(function (item) {
        obj = obj && obj[item];
    });
    return obj || '';
};
exports.getValue = getValue;
