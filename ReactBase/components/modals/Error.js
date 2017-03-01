import React from "react";

class Error extends React.Component{
    render() {
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">An Error has Occurred</h4>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-12">
                            {
                                this.props.errors.map((message, index) => {
                                    return <p key={index}>{message}</p>;
                                })
                            }
                        </div>
                    </div>
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

Error.propTypes = {
    errors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default Error;