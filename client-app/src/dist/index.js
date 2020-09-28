"use strict";
exports.__esModule = true;
exports.history = void 0;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
require("./app/layout/styles.css");
var App_1 = require("./app/layout/App");
var serviceWorker = require("./serviceWorker");
var react_router_dom_1 = require("react-router-dom");
var scrollToTop_1 = require("./app/layout/scrollToTop");
var history_1 = require("history");
require("react-toastify/dist/ReactToastify.css");
require("react-widgets/dist/css/react-widgets.css");
var react_widgets_date_fns_1 = require("react-widgets-date-fns");
react_widgets_date_fns_1["default"]();
exports.history = history_1.createBrowserHistory();
react_dom_1["default"].render(react_1["default"].createElement(react_router_dom_1.Router, { history: exports.history },
    react_1["default"].createElement(scrollToTop_1["default"], null),
    react_1["default"].createElement(App_1["default"], null)), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
