import React from "react";
import { useState } from "react";
import {Alert, Toast, ToastContainer} from "react-bootstrap"

interface IErrorMessageProps {
    errorMessage: string;
    setErrorMessage: (nextMsg : string) => void

}

function ErrorMessageComponent(props: IErrorMessageProps) {
    
    const clearMessage = () => props.setErrorMessage('')

    return (
        <>
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{ minHeight: '240px' }}
        >
            <Toast style={{backgroundColor: "red"}} onClose={clearMessage} show={true} delay={6000} autohide>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body><Alert variant="danger">{props.errorMessage}</Alert></Toast.Body>
            </Toast>
        </div>
        </>
        
    )
}

export default ErrorMessageComponent;