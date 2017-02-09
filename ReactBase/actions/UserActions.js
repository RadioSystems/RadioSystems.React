import * as types from "../action_types/UserActionTypes";

class UserActions {
    static userLoaded(user) {
        return { type: types.USER_LOADED, user };
    }
}

export default UserActions