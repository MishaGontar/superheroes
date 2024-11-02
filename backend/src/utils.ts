import {BadRequestException, ConflictException, NotFoundException} from "@nestjs/common";

export function handleError(msg: string, error: Error) {
    console.error(msg, error);
    if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
    }
    throw new BadRequestException(msg);
}