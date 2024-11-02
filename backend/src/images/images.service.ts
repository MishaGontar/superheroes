import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {IImage} from "./interfaces";
import {MulterFile} from "../storage";
import {join} from "path"
import {unlink} from "fs/promises";
import * as fs from "node:fs";

@Injectable()
export class ImagesService {
    constructor(private readonly prisma: PrismaService) {
    }

    async createImages(
        files: MulterFile[],
        superheroId: number,
    ): Promise<IImage[]> {
        try {
            return await Promise.all(
                files.map(async ({path, originalname: originalName}: MulterFile): Promise<IImage> => {
                    const image: IImage = await this.prisma.images.create({
                        data: {path, originalName,},
                    });

                    await this.prisma.image_Heroes.create({
                        data: {
                            superheroId,
                            imageId: image.id,
                        },
                    });

                    return image;
                }),
            );
        } catch (error) {
            console.error('Error creating images:', error);
            throw new BadRequestException('Failed to create images');
        }
    }

    async remove(id: number): Promise<IImage> {
        try {
            const image = await this.prisma.images.findUnique({
                where: {id},
            });

            if (!image) {
                throw new NotFoundException("Image not found");
            }

            const filePath = join(__dirname, '..', '..', image.path);
            if (fs.existsSync(filePath)) {
                await unlink(filePath);
            } else {
                console.warn(`File not found for image ID ${id}: ${filePath}`);
            }
            return await this.prisma.images.delete({where: {id}});
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error remove images:', error);
            throw new BadRequestException("Error while remove image")
        }
    }
}
