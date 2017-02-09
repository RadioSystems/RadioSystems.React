import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import userReducer from "./userReducer";
import modalReducer from "./modalReducer";

import createReducer from "../../../Blue.Core/ReactUI/reducers/createReducer.js"
import dealerManagementReducer from "../../../Blue.Core/ReactUI/reducers/dealerManagementReducer.js"
import employeeManagementReducer from "../../../Blue.Core/ReactUI/reducers/employeeManagementReducer.js"


const rootReducer = combineReducers({
    routing: routerReducer,
	user: userReducer,
	modal: modalReducer,
    create: createReducer,
    dealerManagement: dealerManagementReducer,
    employeeManagement: employeeManagementReducer
});

export default rootReducer;