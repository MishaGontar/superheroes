import {ConflictException, Injectable, NotFoundException,} from "@nestjs/common";
import {UpdateSuperheroDto} from "./dto/update-superhero.dto";
import {PrismaService} from "../prisma.service";
import {findAllPagination, fullIncludeData} from "./constans";
import {ISuperhero, ISuperheroDetail, ISuperheroesListPage, ISuperheroItemList,} from "./interfaces";
import {CreateSuperheroDto} from "./dto/create-superhero.dto";
import {Image} from "../images/interfaces";
import {ImagesService} from "../images/images.service";

@Injectable()
export class SuperheroesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly imageService: ImagesService
    ) {
    }

    async create(superHero: CreateSuperheroDto): Promise<ISuperhero> {
        const {nickname} = superHero;
        const isExistSuperhero = await this.prisma.superheroes.findFirst({
            where: {nickname},
        });

        if (isExistSuperhero) {
            throw new ConflictException(`Superhero with nickname '${nickname}' already exists.`);
        }

        return this.prisma.superheroes.create({
            data: superHero,
        });
    }

    async findAll(page = 1, limit = 5): Promise<ISuperheroesListPage> {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.superheroes.findMany(findAllPagination(skip, limit)),
            this.prisma.superheroes.count(),
        ]);
        const prettySuperheroesList: ISuperheroItemList[] = data.map((superhero) => this.getPrettySuperHeroObj(superhero),);

        return {
            superheroes: prettySuperheroesList,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }

    async findOne(id: number): Promise<ISuperheroDetail> {
        const superhero = await this.prisma.superheroes.findUnique({
            where: {id},
            include: fullIncludeData,
        });

        if (!superhero) {
            throw new NotFoundException(`Superhero with ID ${id} not found`);
        }
        return this.getPrettySuperHeroObj(superhero);
    }

    async update(
        id: number,
        updateSuperheroDto: UpdateSuperheroDto,
    ): Promise<ISuperheroDetail> {
        const superhero = await this.prisma.superheroes.update({
            where: {id},
            data: updateSuperheroDto,
            include: fullIncludeData,
        });
        return this.getPrettySuperHeroObj(superhero);
    }

    async remove(superheroId: number): Promise<ISuperhero> {
        const data = await this.prisma.image_Heroes.findMany({
            where: {superheroId}
        })
        await Promise.all([data.map(async (d) => await this.imageService.remove(d.imageId))])
        return this.prisma.superheroes.delete({where: {id: superheroId}});
    }

    private getPrettySuperHeroObj(superhero) {
        return {
            ...superhero,
            images: superhero.images.map((i: { image: Image }) => ({...i.image})),
        };
    }
}
