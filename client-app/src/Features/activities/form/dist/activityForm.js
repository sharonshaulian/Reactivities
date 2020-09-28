"use strict";
exports.__esModule = true;
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var activity_1 = require("../../../app/models/activity");
var activityStore_1 = require("../../../app/stores/activityStore");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_final_form_1 = require("react-final-form");
var textInput_1 = require("../../../app/common/form/textInput");
var textAreaInput_1 = require("../../../app/common/form/textAreaInput");
var selectInput_1 = require("../../../app/common/form/selectInput");
var categoryOptions_1 = require("../../../app/common/options/categoryOptions");
var dateInput_1 = require("../../../app/common/form/dateInput");
var revalidate_1 = require("revalidate");
var validate = revalidate_1.combineValidators({
    title: revalidate_1.isRequired({ message: 'The event title is Required' }),
    category: revalidate_1.isRequired('Category'),
    description: revalidate_1.composeValidators(revalidate_1.isRequired('Description'), revalidate_1.hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' }))('Description'),
    date: revalidate_1.isRequired('Date'),
    city: revalidate_1.isRequired('City'),
    venue: revalidate_1.isRequired('Venue')
});
var ActivityForm = function (_a) {
    var match = _a.match, history = _a.history;
    var activityStore = react_1.useContext(activityStore_1["default"]);
    var isFormSubmit = activityStore.isFormSubmit, clearActivity = activityStore.clearActivity;
    react_1.useEffect(function () {
        if (match && match.params.id) {
            setLoading(true);
            activityStore.loadActivity(match.params.id).then(function (activity) {
                setActivity(new activity_1.ActivityFormValues(activity));
            })["finally"](function () { setLoading(false); });
        }
    }, [activityStore.loadActivity, match === null || match === void 0 ? void 0 : match.params.id]);
    var _b = react_1.useState(new activity_1.ActivityFormValues()), activity = _b[0], setActivity = _b[1];
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    // const handleInputChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const {name, value} = ev.currentTarget;
    //     setActivity({...activity, [name]: value});
    //  }
    var handleFormCancellation = function () {
        if (activity.id === '')
            history.push("/activities");
        else
            history.push("/activities/" + activity.id);
    };
    var handleFinalFormSubmit = function (activity) {
        console.log(activity);
        activityStore.handleFormSubmittion(activity)
            .then(function (resultId) {
            history.push("/activities/" + resultId);
        });
    };
    return (react_1["default"].createElement(semantic_ui_react_1.Grid, null,
        react_1["default"].createElement(semantic_ui_react_1.GridColumn, { width: 10 },
            react_1["default"].createElement(semantic_ui_react_1.Segment, { clearing: true },
                react_1["default"].createElement(react_final_form_1.Form, { initialValues: activity, onSubmit: handleFinalFormSubmit, validate: validate, render: function (_a) {
                        var handleSubmit = _a.handleSubmit;
                        return (react_1["default"].createElement(semantic_ui_react_1.Form, { loading: loading, onSubmit: handleSubmit },
                            react_1["default"].createElement(react_final_form_1.Field, { placeholder: 'Title', value: activity.title, name: 'title', component: textInput_1.TextInput }),
                            react_1["default"].createElement(react_final_form_1.Field, { rows: '2', placeholder: 'Description', value: activity.description, name: 'description', component: textAreaInput_1.TextAreaInput }),
                            react_1["default"].createElement(react_final_form_1.Field, { placeholder: 'Category', value: activity.category, name: 'category', component: selectInput_1.SelectInput, options: categoryOptions_1.category }),
                            react_1["default"].createElement(semantic_ui_react_1.Form.Group, { widths: 'equal' },
                                react_1["default"].createElement(react_final_form_1.Field, { component: dateInput_1.DateInput, name: 'date', date: true, time: true, placeholder: 'Date', value: activity.date })),
                            react_1["default"].createElement(react_final_form_1.Field, { placeholder: 'City', value: activity.city, name: 'city', component: textInput_1.TextInput }),
                            react_1["default"].createElement(react_final_form_1.Field, { placeholder: 'Venue', value: activity.venue, name: 'venue', component: textInput_1.TextInput }),
                            react_1["default"].createElement(semantic_ui_react_1.Button, { disabled: loading, loading: isFormSubmit, floated: 'right', type: 'submit', content: 'Submit', positive: true }),
                            react_1["default"].createElement(semantic_ui_react_1.Button, { disabled: loading, floated: 'right', type: 'button', content: 'Cancel', onClick: handleFormCancellation })));
                    } }))),
        react_1["default"].createElement(semantic_ui_react_1.GridColumn, { width: 6 })));
};
exports["default"] = mobx_react_lite_1.observer(ActivityForm);
