import { Module } from "@nestjs/common";
import { SuperheroesService } from "./superheroes.service";
import { SuperheroesController } from "./superheroes.controller";
import { PrismaService } from "../prisma.service";
import { ImagesService } from "../images/images.service";

@Module({
  controllers: [SuperheroesController],
  providers: [SuperheroesService, PrismaService, ImagesService],
})
export class SuperheroesModule {}
