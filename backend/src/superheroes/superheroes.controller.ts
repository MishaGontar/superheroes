import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { SuperheroesService } from "./superheroes.service";
import { CreateSuperheroDto } from "./dto/create-superhero.dto";
import { UpdateSuperheroDto } from "./dto/update-superhero.dto";
import { ImagesService } from "../images/images.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { MulterFile, storage } from "../storage";
import {
  ISuperHero,
  ISuperHeroDetail,
  ISuperHeroesPaginationDetails,
} from "./interfaces";

@Controller("superheroes")
export class SuperheroesController {
  constructor(
    private readonly superheroesService: SuperheroesService,
    private readonly imagesService: ImagesService,
  ) {}

  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto): Promise<ISuperHero> {
    return this.superheroesService.create(createSuperheroDto);
  }

  @Post("detail")
  @UseInterceptors(FilesInterceptor("images", 10, { storage }))
  async createWithImages(
    @Body() createSuperheroDto: CreateSuperheroDto,
    @UploadedFiles() images: MulterFile[],
  ): Promise<ISuperHero> {
    const superHero = await this.superheroesService.create(createSuperheroDto);

    if (!superHero) {
      throw new BadRequestException("Superhero is not created!");
    }

    await this.imagesService.createImages(images, superHero.id);
    return superHero;
  }

  @Get()
  findAll(@Query("page") page = 1): Promise<ISuperHeroesPaginationDetails> {
    return this.superheroesService.findAll(page);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<ISuperHeroDetail> {
    return this.superheroesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ): Promise<ISuperHeroDetail> {
    return this.superheroesService.update(+id, updateSuperheroDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<ISuperHero> {
    return this.superheroesService.remove(+id);
  }
}
