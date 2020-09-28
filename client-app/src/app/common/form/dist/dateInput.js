"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.DateInput = void 0;
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var react_widgets_1 = require("react-widgets");
exports.DateInput = function (_a) {
    var input = _a.input, width = _a.width, placeholder = _a.placeholder, _b = _a.meta, touched = _b.touched, error = _b.error, rest = _a.rest;
    return (react_1["default"].createElement(semantic_ui_react_1.Form.Field, { error: touched && !!error, width: width },
        react_1["default"].createElement(react_widgets_1.DateTimePicker, __assign({ format: 'dd-MM-YYYY HH:mm:ss', value: input.value || null, onChange: input.onChange, placeholder: placeholder, onBlur: input.onBlur, onKeyDown: function (e) { return e.preventDefault(); } }, rest)),
        touched && error &&
            (react_1["default"].createElement(semantic_ui_react_1.Label, { basic: true, color: 'red' }, error))));
};
