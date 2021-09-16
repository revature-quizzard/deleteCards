import { useState } from "react";
import {Toast, ToastContainer} from "react-bootstrap"

interface IErrorMessageProps {
    errorMessage: string;
}

function ErrorMessageComponent(props: IErrorMessageProps) {
    const [show, setShow] = useState(true);
    return (
        <>
        <div
            aria-live="polite"
            aria-atomic="true"
            className="bg-white position-relative"
            style={{ minHeight: '240px' }}
        >
        <ToastContainer position="bottom-start" className="p-3">
            <Toast  onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>{props.errorMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
        </div>
        </>
        
    )
}

export default ErrorMessageComponent;