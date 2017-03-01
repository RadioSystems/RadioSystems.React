import React, {Component} from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import configureStore from "./store/configureStore";
import routes from "./routes/routes";
import Authorizer from "./authorizer/Authorizer";
import AccessDeniedPage from "./components/AccessDeniedPage";
import NotFoundPage from "./components/NotFoundPage";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

function authorize(permission) {
    return Authorizer.authorize(permission, store.getState().user);
}

const plainRoutes = [
    {
        path: '/react',
        getComponent: (location, callback) => {
            require.ensure([], (require) => {
                const app = require("./containers/OrchardReactApp").default;
                callback(null, app);
            });
        },
        childRoutes: routes.map((route) => {
            return route(authorize, store);
        })
    },
    {
        path: "/users/account/accessdenied",
        component: AccessDeniedPage
    },
    {
        path: "*",
        component: NotFoundPage
    }
];

render(
    <Provider store={store}>
        <Router history={history} routes={plainRoutes} />
    </Provider>, document.getElementById("orchard-react")
);
