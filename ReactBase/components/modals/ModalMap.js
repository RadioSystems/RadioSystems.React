import * as types from "./ModalTypes";
import Alert from "./Alert";
import Confirm from "./Confirm";

import blueCoreModals from "../../../../Blue.Core/ReactUI/modal_types/blueCoreModals.js"


const modalMap = {
    [types.ALERT]: Alert,
    [types.CONFIRM]: Confirm
}

export default Object.assign({}, modalMap, blueCoreModals);