import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Images } from "./interfaces";
import { MulterFile } from "../storage";

@Injectable()
export class ImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async createImages(
    files: MulterFile[],
    superheroId: number,
  ): Promise<Images[]> {
    return await Promise.all(
      files.map(async (i: MulterFile): Promise<Images> => {
        const image: Images = await this.prisma.images.create({
          data: {
            path: i.path,
            originalName: i.originalname,
          },
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

  async remove(id: number): Promise<Images> {
    return this.prisma.images.delete({ where: { id } });
  }
}
