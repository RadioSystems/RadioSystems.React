import * as types from "../action_types/UserActionTypes";
//import objectAssign from "object-assign";

const userActionsHandler = {
    [types.USER_LOADED](state, action) {
        return action.user;
    }
}

export default userActionsHandler;