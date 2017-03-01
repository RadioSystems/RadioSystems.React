import React, {Component} from "react";
import {connect} from "react-redux";
import ModalActions from "../actions/ModalActions";
import ModalMap from "../components/modals/ModalMap";

class Modal extends Component {
    componentDidUpdate() {
        var modal = $(this.refs.modal);
        if(this.props.visible){
            modal.modal("show");
        }else{
            modal.modal("hide");
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
        }
    }
    render() {
        const ModalContent = ModalMap[this.props.type];
        return (
            <div ref="modal" className={"modal fade modal-container " + this.props.modalProps.type} role="dialog" data-backdrop="static">
                <div className={"modal-dialog modal-" + this.props.modalProps.modalSize } role="document">
                    <div className="modal-content">
                        <ModalContent hideModal={this.props.hideModal} {...this.props.modalProps} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        visible: state.modal.visible,
        type: state.modal.type,
        modalProps: state.modal.modalProps
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModal: () => {
            dispatch(ModalActions.hideModal());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);