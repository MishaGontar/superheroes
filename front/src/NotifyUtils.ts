import {Bounce, toast, ToastOptions} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const options: ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
}

export function sendSuccessfulNotify(msg: string) {
    toast.success(msg, options)
}

export function sendInfoNotify(msg: string) {
    toast.info(msg, options)
}

export function sendErrorNotify(msg: string) {
    toast.error(msg, options)
}

export function sendUnexpectedErrorNotify() {
    toast.error("Something went wrong on our side.", options)
}