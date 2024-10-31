import {Controller, Delete, Param, Post, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {ImagesService} from "./images.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {MulterFile, storage} from "../storage";

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImagesService) {
    }

    @Post('superhero/:id')
    @UseInterceptors(FilesInterceptor("images", 10, {storage}))
    createImageBySuperheroId(@Param('id') superheroId: string,
                             @UploadedFiles() images: MulterFile[]) {
        return this.imageService.createImages(images, +superheroId);
    }

    @Delete(":id")
    remove(@Param('id') id: string) {
        return this.imageService.remove(+id)
    }
}