import './error.styles.css'
import ErrorPage from "./ErrorPage.tsx";

export default function UnexpectedError() {
    return (
        <ErrorPage headerText="Whoops, something went wrong"
                   context="Please either refresh the page or return home to try again.."
        />
    )
}