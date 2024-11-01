import {
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
import {SuperheroesService} from "./superheroes.service";
import {CreateSuperheroDto} from "./dto/create-superhero.dto";
import {UpdateSuperheroDto} from "./dto/update-superhero.dto";
import {ImagesService} from "../images/images.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {MulterFile, storage} from "../storage";
import {ISuperhero, ISuperheroDetail, ISuperheroesListPage,} from "./interfaces";

@Controller("superheroes")
export class SuperheroesController {
    constructor(
        private readonly superheroesService: SuperheroesService,
        private readonly imagesService: ImagesService,
    ) {
    }

    @Post()
    create(@Body() createSuperheroDto: CreateSuperheroDto): Promise<ISuperhero> {
        return this.superheroesService.create(createSuperheroDto);
    }

    @Post("detail")
    @UseInterceptors(FilesInterceptor("images", 10, {storage}))
    async createWithImages(
        @Body() createSuperheroDto: CreateSuperheroDto,
        @UploadedFiles() images: MulterFile[],
    ): Promise<ISuperhero> {
        const superhero: ISuperhero = await this.superheroesService.create(createSuperheroDto);
        await this.imagesService.createImages(images, superhero.id);
        return superhero;
    }

    @Get()
    findAll(@Query("page") page = 1): Promise<ISuperheroesListPage> {
        return this.superheroesService.findAll(+page);
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<ISuperheroDetail> {
        return this.superheroesService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateSuperheroDto: UpdateSuperheroDto,
    ): Promise<ISuperheroDetail> {
        return this.superheroesService.update(+id, updateSuperheroDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<ISuperhero> {
        return this.superheroesService.remove(+id);
    }
}
