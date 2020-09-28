"use strict";
exports.__esModule = true;
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.toLocalDate = function (isoString) {
        var srcAsTime = new Date(isoString).getTime();
        var offset = new Date(isoString).getTimezoneOffset();
        var converter = offset * (-1 * 60 * 1000);
        return new Date(srcAsTime + converter);
    };
    return Helpers;
}());
exports["default"] = Helpers;
