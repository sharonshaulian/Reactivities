"use strict";
exports.__esModule = true;
exports.ActivityDetailsHeader = void 0;
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var react_router_dom_1 = require("react-router-dom");
var activityImageStyle = {
    filter: 'brightness(30%)'
};
var activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};
exports.ActivityDetailsHeader = function (_a) {
    var activity = _a.activity;
    return (react_1["default"].createElement(semantic_ui_react_1.Segment.Group, null,
        react_1["default"].createElement(semantic_ui_react_1.Segment, { basic: true, attached: 'top', style: { padding: '0' } },
            react_1["default"].createElement(semantic_ui_react_1.Image, { src: "/assets/categoryImages/" + activity.category + ".jpg", fluid: true, style: activityImageStyle }),
            react_1["default"].createElement(semantic_ui_react_1.Segment, { style: activityImageTextStyle, basic: true },
                react_1["default"].createElement(semantic_ui_react_1.Item.Group, null,
                    react_1["default"].createElement(semantic_ui_react_1.Item, null,
                        react_1["default"].createElement(semantic_ui_react_1.Item.Content, null,
                            react_1["default"].createElement(semantic_ui_react_1.Header, { size: 'huge', content: activity.title, style: { color: 'white' } }),
                            react_1["default"].createElement("p", null,
                                " ",
                                activity.date.toString(),
                                " "),
                            react_1["default"].createElement("p", null,
                                "Hosted by ",
                                react_1["default"].createElement("strong", null, "Bob"))))))),
        react_1["default"].createElement(semantic_ui_react_1.Segment, { clearing: true, attached: 'bottom' },
            react_1["default"].createElement(semantic_ui_react_1.Button, { color: 'teal' }, "Join Activity"),
            react_1["default"].createElement(semantic_ui_react_1.Button, null, "Cancel attendance"),
            react_1["default"].createElement(semantic_ui_react_1.Button, { color: 'orange', floated: 'right', as: react_router_dom_1.Link, to: "/editActivity/" + activity.id }, "Manage Event"))));
};
