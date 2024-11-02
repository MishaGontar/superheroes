import {useNavigate} from "react-router-dom";
import {Button} from "@nextui-org/react";
import './error.styles.css'
import {ErrorCodes, ErrorMessage, errors} from "./ErrorMessages.ts";


interface ErrorProps {
    errorCode: ErrorCodes;
}

export default function ErrorPage({errorCode = 404}: ErrorProps) {
    const navigate = useNavigate();
    const {headerText, context}: ErrorMessage = errors[errorCode] || errors[404]
    return (
        <div className="error-container">
            <div className="error-box">
                <h1 className="error-header-code">{errorCode}</h1>

                <p className="error-header-text">{headerText}</p>

                <p className="error-text">{context}</p>

                <Button variant="shadow"
                        color="secondary"
                        className="error-button"
                        onClick={() => navigate('/')}>
                    Go Back Home
                </Button>
            </div>
        </div>
    )
}