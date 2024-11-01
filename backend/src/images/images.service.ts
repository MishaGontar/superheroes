import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Image} from "./interfaces";
import {MulterFile} from "../storage";
import {join} from "path"
import {unlink} from "fs/promises";

@Injectable()
export class ImagesService {
    constructor(private readonly prisma: PrismaService) {
    }

    async createImages(
        files: MulterFile[],
        superheroId: number,
    ): Promise<Image[]> {
        return await Promise.all(
            files.map(async ({path, originalname: originalName}: MulterFile): Promise<Image> => {
                const image: Image = await this.prisma.images.create({
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
    }

    async remove(id: number): Promise<Image> {
        const image = await this.prisma.images.findUnique({
            where: {id},
        });

        if (!image) {
            throw new NotFoundException("Image not found");
        }
        const filePath = join(__dirname, '..', '..', image.path);
        await unlink(filePath);
        return this.prisma.images.delete({where: {id}});
    }
}
