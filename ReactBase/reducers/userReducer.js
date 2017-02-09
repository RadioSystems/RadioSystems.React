import * as userActionTypes from "../action_types/UserActionTypes";
import initialState from "../initialState";

//initial user state is populated in React Index view
export default function(state = initialState.user, action) {
    switch(action.type){
        case userActionTypes.USER_LOADED:
            return action.user;
        default :
            return state;
    }
}