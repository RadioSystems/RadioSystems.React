export default function createReducer(initialState, handler){
    return function(state = initialState, action) {
        if (handler.hasOwnProperty(action.type)) {
            return handler[action.type](state, action);
        }
        return state;
    }
}