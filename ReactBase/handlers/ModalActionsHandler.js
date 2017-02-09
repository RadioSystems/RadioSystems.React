import * as types from "../action_types/ModalActionTypes";

const modalActionsHandler = {
    [types.SHOW_MODAL](state, action) {
        return { visible: true, type: action.modalType, modalProps: action.modalProps };
    },
    [types.HIDE_MODAL](state, action) {
        return { visible: false, type: "ALERT", modalProps: {text: ""} };
    }
}

export default modalActionsHandler;