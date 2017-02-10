import * as types from "./ModalTypes";
import Alert from "./Alert";
import Confirm from "./Confirm";



const modalMap = {
    [types.ALERT]: Alert,
    [types.CONFIRM]: Confirm
}

export default Object.assign({}, modalMap, );