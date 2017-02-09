import * as userActionTypes from "../action_types/UserActionTypes";
import createReducer from "./createReducer";
import initialState from "../initialState";
import modalHandler from "../handlers/ModalActionsHandler";

//initial user state is populated in React Index view
export default createReducer(initialState.modal, modalHandler);