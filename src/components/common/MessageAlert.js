import React from 'react';
import { Alert } from 'react-bootstrap';

/*기본 메시지 모달*/
export const DefaultAlert = (props) =>{
    const { message, stateModal, ModalToggle } = props;
    return (
        <>
            <Alert variant='primary' show={stateModal} onClose={ModalToggle} dismissible>
                <Alert.Heading>알림</Alert.Heading>
                <p>{message}
                </p>
            </Alert>
        </>
    )
};