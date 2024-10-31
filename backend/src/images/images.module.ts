import {Module} from '@nestjs/common';
import {ImagesService} from "./images.service";
import {ImageController} from "./image.controller";
import {PrismaService} from "../prisma.service";

@Module({
    providers: [ImagesService, PrismaService],
    controllers: [ImageController]
})
export class ImagesModule {
}
