import axios from "axios";
import {sendErrorNotify} from "./NotifyUtils.ts";

export const HEADERS_FORM_DATA = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
}

export async function getAxios(url: string) {
    try {
        const server = import.meta.env.VITE_BACK_URL;
        const response = await axios.get(`${server}${url}`)
        return response.data;
    } catch (e) {
        sendErrorNotify("Can't load. Please try again later")
        console.error(e)
        throw e;
    }
}