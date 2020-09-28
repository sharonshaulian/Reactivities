"use strict";
exports.__esModule = true;
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var react_router_dom_1 = require("react-router-dom");
var mobx_react_lite_1 = require("mobx-react-lite");
var ActivityItem = function (_a) {
    var activity = _a.activity;
    return (react_1["default"].createElement(semantic_ui_react_1.Segment.Group, null,
        react_1["default"].createElement(semantic_ui_react_1.Segment, null,
            react_1["default"].createElement(semantic_ui_react_1.Item.Group, null,
                react_1["default"].createElement(semantic_ui_react_1.Item, null,
                    react_1["default"].createElement(semantic_ui_react_1.Item.Image, { size: 'tiny', circular: true, src: '/assets/user.png' }),
                    react_1["default"].createElement(semantic_ui_react_1.Item.Content, null,
                        react_1["default"].createElement(semantic_ui_react_1.Item.Header, { as: 'a' }, activity.title),
                        react_1["default"].createElement(semantic_ui_react_1.Item.Description, null, "Hosted by Bob"))))),
        react_1["default"].createElement(semantic_ui_react_1.Segment, null,
            react_1["default"].createElement(semantic_ui_react_1.Icon, { name: 'clock' }),
            " ",
            activity.date.toString(),
            react_1["default"].createElement(semantic_ui_react_1.Icon, { name: 'marker' }),
            " ",
            activity.venue,
            ", ",
            activity.city),
        react_1["default"].createElement(semantic_ui_react_1.Segment, { secondary: true }, "Attendees will go here"),
        react_1["default"].createElement(semantic_ui_react_1.Segment, { clearing: true },
            react_1["default"].createElement("span", null, activity.description),
            react_1["default"].createElement(semantic_ui_react_1.Button, { floated: 'right', content: 'View', color: 'blue', as: react_router_dom_1.Link, to: "/activities/" + activity.id }))));
};
exports["default"] = mobx_react_lite_1.observer(ActivityItem);
