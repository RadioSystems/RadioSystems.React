import React, {Component} from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import configureStore from "./store/configureStore";
import routes from "./routes/routes";
import Authorizer from "./authorizer/Authorizer";

import OrchardReactApp from "./containers/OrchardReactApp";
import AccessDeniedPage from "./components/AccessDeniedPage";
import NotFoundPage from "./components/NotFoundPage";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

function authorize(permission) {
    return Authorizer.authorize(permission, store.getState().user);
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/react" component={OrchardReactApp}>
                {routes.map((route, index) => {
                    var routeProps = route.props;
                    if (typeof(route) === "function") {
                        routeProps = route(authorize, store).props;
                    }
                    return <Route {...routeProps} key={index}/>;
                })}
            </Route>
            <Route path="/users/account/accessdenied" component={AccessDeniedPage}/>
            <Route path="*" component={NotFoundPage}/>
        </Router>
    </Provider>, document.getElementById("orchard-react")
);
