import React from "react";

class Alert extends React.Component{
    render(){
        return (
            <div className="alert-modal">
                <div className="modal-body">
                    <h3 className="text-center">{this.props.text}</h3>
                </div>
                <div className="modal-footer">
                    <div className="row">
                        <div className="col-md-3 col-md-offset-9">
                            <button className="btn btn-default btn-block" onClick={this.props.hideModal}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

Alert.propTypes = {
    text: React.PropTypes.string.isRequired
};

export default Alert;