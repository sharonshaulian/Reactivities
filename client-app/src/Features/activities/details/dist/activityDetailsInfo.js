"use strict";
exports.__esModule = true;
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var ActivityDetailesInfo = function (_a) {
    var activity = _a.activity;
    return (react_1["default"].createElement(semantic_ui_react_1.Segment.Group, null,
        react_1["default"].createElement(semantic_ui_react_1.Segment, { attached: 'top' },
            react_1["default"].createElement(semantic_ui_react_1.Grid, null,
                react_1["default"].createElement(semantic_ui_react_1.Grid.Column, { width: 1 },
                    react_1["default"].createElement(semantic_ui_react_1.Icon, { size: 'large', color: 'teal', name: 'info' })),
                react_1["default"].createElement(semantic_ui_react_1.Grid.Column, { width: 15 },
                    react_1["default"].createElement("p", null, activity.description)))),
        react_1["default"].createElement(semantic_ui_react_1.Segment, { attached: true },
            react_1["default"].createElement(semantic_ui_react_1.Grid, { verticalAlign: 'middle' },
                react_1["default"].createElement(semantic_ui_react_1.Grid.Column, { width: 1 },
                    react_1["default"].createElement(semantic_ui_react_1.Icon, { name: 'calendar', size: 'large', color: 'teal' })),
                react_1["default"].createElement(semantic_ui_react_1.Grid.Column, { width: 15 },
                    react_1["default"].createElement("span", null, "date here !")))),
        react_1["default"].createElement(semantic_ui_react_1.Segment, { attached: true },
            react_1["default"].createElement(semantic_ui_react_1.Grid, { verticalAlign: 'middle' },
                react_1["default"].createElement(semantic_ui_react_1.Grid.Column, { width: 1 },
                    react_1["default"].createElement(semantic_ui_react_1.Icon, { name: 'marker', size: 'large', color: 'teal' })),
                react_1["default"].createElement(semantic_ui_react_1.Grid.Column, { width: 11 },
                    react_1["default"].createElement("span", null,
                        activity.venue,
                        ", ",
                        activity.city))))));
};
exports["default"] = ActivityDetailesInfo;
