import {ConflictException, Injectable, NotFoundException,} from "@nestjs/common";
import {UpdateSuperheroDto} from "./dto/update-superhero.dto";
import {PrismaService} from "../prisma.service";
import {findAllPagination, fullIncludeData} from "./constans";
import {
    ISuperhero,
    ISuperheroDetail,
    ISuperheroesListPage,
    ISuperheroFullDetail,
    ISuperheroItemList,
} from "./interfaces";
import {CreateSuperheroDto} from "./dto/create-superhero.dto";
import {IImage, ImageHero} from "../images/interfaces";
import {ImagesService} from "../images/images.service";
import {handleError} from "../utils";

@Injectable()
export class SuperheroesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly imageService: ImagesService
    ) {
    }

    async create(superHero: CreateSuperheroDto): Promise<ISuperhero> {
        const {nickname} = superHero;
        try {
            const isExistSuperhero: ISuperhero = await this.prisma.superheroes.findFirst({
                where: {nickname},
            });

            if (isExistSuperhero) {
                throw new ConflictException(`Superhero with nickname '${nickname}' already exists.`);
            }

            return await this.prisma.superheroes.create({
                data: superHero,
            });
        } catch (error) {
            handleError("Error while creating superhero", error)
        }
    }

    async findAll(page = 1, limit = 5): Promise<ISuperheroesListPage> {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.superheroes.findMany(findAllPagination(skip, limit)),
                this.prisma.superheroes.count(),
            ]);
            const prettySuperheroesList: ISuperheroItemList[] = data.map((superhero) => this.getPrettySuperHeroObj(superhero));

            return {
                superheroes: prettySuperheroesList,
                total,
                page,
                lastPage: Math.ceil(total / limit),
            };
        } catch (error) {
            handleError("Error while finding all superheroes", error)
        }

    }

    async findOne(id: number): Promise<ISuperheroDetail> {
        try {
            const superhero: ISuperheroFullDetail = await this.prisma.superheroes.findUnique({
                where: {id},
                include: fullIncludeData,
            });

            if (!superhero) {
                throw new NotFoundException(`Superhero with ID ${id} not found`);
            }
            return this.getPrettySuperHeroObj(superhero);
        } catch (error) {
            handleError("Error while finding superhero", error);
        }
    }

    async update(
        id: number,
        updateSuperheroDto: UpdateSuperheroDto,
    ): Promise<ISuperheroDetail> {
        try {
            const superhero: ISuperheroFullDetail = await this.prisma.superheroes.update({
                where: {id},
                data: updateSuperheroDto,
                include: fullIncludeData,
            });
            return this.getPrettySuperHeroObj(superhero);
        } catch (error) {
            handleError("Error while update superhero", error)
        }
    }

    async remove(superheroId: number): Promise<ISuperhero> {
        try {
            const heroImages = await this.prisma.image_Heroes.findMany({
                where: {superheroId}
            })
            await Promise.all(heroImages.map((i: ImageHero): Promise<IImage> => this.imageService.remove(i.imageId)))
            return this.prisma.superheroes.delete({where: {id: superheroId}});
        } catch (error) {
            handleError("Error while remove superhero", error)
        }
    }

    private getPrettySuperHeroObj(superhero) {
        return {
            ...superhero,
            images: superhero.images.map((i: { image: IImage }): IImage => i.image),
        };
    }
}
