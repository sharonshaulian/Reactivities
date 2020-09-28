"use strict";
exports.__esModule = true;
exports.ActivityFormValues = void 0;
var ActivityFormValues = /** @class */ (function () {
    function ActivityFormValues(initValues) {
        this.id = '';
        this.title = '';
        this.description = '';
        this.category = '';
        this.date = undefined;
        this.city = '';
        this.venue = '';
        if (initValues) {
            Object.assign(this, initValues);
        }
    }
    return ActivityFormValues;
}());
exports.ActivityFormValues = ActivityFormValues;
