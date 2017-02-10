import "babel-polyfill";
import React, {Component, cloneElement} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import ModalContainer from "./ModalContainer";
import ModalActions from "../actions/ModalActions";
import Authorizer from "../authorizer/Authorizer";

class OrchardReactApp extends Component {
    constructor(props) {
        super(props);
        this.authorize = this.authorize.bind(this);
    }
    authorize(permission) {
        return Authorizer.authorize(permission, this.props.user.permissions);
    }
    login() {
        window.location = "/users/account/logon";
    }
    logout() {
        window.location = "/users/account/logoff";
    }
    render() {
        const jqueryAndBootstrapDefined = typeof($) !== "undefined" && typeof($.fn.modal) !== "undefined";
        return (
            <div className="orchard-react-container">
                {
                    cloneElement(this.props.children, Object.assign({}, this.props,
                        {   
                            authorize: this.authorize
                        })
                    )
                }
                {
                  //only load modals if bootstrap is present
                   jqueryAndBootstrapDefined ?  <ModalContainer /> : null
                }
            </div>    
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showAlert: (text) => {
            dispatch(ModalActions.showAlert(text));
        },
        showConfirm: (text, yesFunction, noFunction) => {
            dispatch(ModalActions.showConfirm(text, yesFunction, noFunction));
        },
        showModal: (modalType, modalProps) => {
            dispatch(ModalActions.showModal(modalType, modalProps));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrchardReactApp);