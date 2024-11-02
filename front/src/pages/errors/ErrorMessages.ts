export enum ErrorCodes {
    NotFound = 404,
    InternalServerError = 500,
}

export interface ErrorMessage {
    headerText: string;
    context: string;
}

export const errors: Record<ErrorCodes, ErrorMessage> = {
    [ErrorCodes.NotFound]: {
        headerText: "Uh-oh!",
        context: "We can't find that page."
    },
    [ErrorCodes.InternalServerError]: {
        headerText: "Whoops, something went wrong",
        context: "Please either refresh the page or return home to try again."
    }
}
