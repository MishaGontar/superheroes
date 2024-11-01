import {useNavigate} from "react-router-dom";
import {Button} from "@nextui-org/react";
import './error.styles.css'

interface ErrorProps {
    code?: number;
    headerText?: string;
    context?: string;
}

const error404: ErrorProps = {
    code: 404,
    headerText: "Uh-oh!",
    context: "We can't find that page."
}

export default function ErrorPage({
                                      code = error404.code,
                                      headerText = error404.headerText,
                                      context = error404.context
                                  }: ErrorProps) {
    const navigate = useNavigate();
    return (
        <div className="error-container">
            <div className="error-box">
                <h1 className="error-header-code">{code}</h1>

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