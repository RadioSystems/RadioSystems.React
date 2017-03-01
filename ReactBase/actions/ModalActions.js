import * as actionTypes from "../action_types/ModalActionTypes";
import * as modalTypes from "../components/modals/ModalTypes";

class ModalActions{
    static showAlert(alertText){
        return {
            type: actionTypes.SHOW_MODAL, 
            modalType: modalTypes.ALERT, 
            modalProps: {text: alertText} 
        }
    }
    static showConfirm(confirmText, confirmFunction, cancelFunction){
        return {
            type: actionTypes.SHOW_MODAL,
            modalType: modalTypes.CONFIRM,
            modalProps: {
                text: confirmText,
                confirmFunction: confirmFunction,
                cancelFunction: cancelFunction
            }
        }
    }
    static showError(errors) {
        return {
            type: actionTypes.SHOW_MODAL,
            modalType: modalTypes.ERROR,
            modalProps: {
                errors: errors,
                type: "alert"
            }
        }
    }
    static showModal(type, props){
        return {type: actionTypes.SHOW_MODAL, modalType: type, modalProps: props};
    }
    static hideModal(){
        return {type: actionTypes.HIDE_MODAL};
    }
}

export default ModalActions;