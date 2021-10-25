import React from 'react';
import { UncontrolledAlert } from "reactstrap";

const Alert = (props) => {
    const { alert, setAlert } = props;

    return (
        <>
            <UncontrolledAlert color="warning" onClick={() => { setAlert({ on: false, message: '' }) }}>
                <span className="alert-inner--icon">
                    <i className="ni ni-like-2" />
                </span>{" "}
                <span className="alert-inner--text">
                    <strong>Warning!</strong> {alert.message}
                </span>
            </UncontrolledAlert>
        </>
    );
}

export default Alert;