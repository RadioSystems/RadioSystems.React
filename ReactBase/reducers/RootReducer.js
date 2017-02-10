import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import userReducer from "./userReducer";
import modalReducer from "./modalReducer";



const rootReducer = combineReducers({
    routing: routerReducer,
	user: userReducer,
	modal: modalReducer,

});

export default rootReducer;