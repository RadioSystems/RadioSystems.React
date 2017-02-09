import React from "react";

class Confirm extends React.Component{
    constructor(props){
        super(props);
        this.handleYesClick = this.handleYesClick.bind(this);
        this.handleNoClick = this.handleNoClick.bind(this);
    }
    handleYesClick(){
        this.props.hideModal();
        this.props.confirmFunction();
    }
    handleNoClick(){
        this.props.hideModal();
        if(typeof(this.props.cancelFunction) === "function"){
            this.props.cancelFunction();
        }
    }
    render(){
        return (
            <div className="confirm-modal">
                <div className="modal-body">
                    <h3 className="text-center">{this.props.text}</h3>
                </div>
                <div className="modal-footer">
                    <div className="row">
                        <div className="col-md-3 col-md-offset-6 col-sm-6 col-xs-12">
                            <button className="btn btn-danger btn-block" onClick={this.handleNoClick}>No</button>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <button className="btn btn-success btn-block" onClick={this.handleYesClick}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

Confirm.propTypes = {
    text: React.PropTypes.string.isRequired,
    hideModal: React.PropTypes.func.isRequired,
    confirmFunction: React.PropTypes.func.isRequired,
    cancelFunction: React.PropTypes.func
}

export default Confirm;