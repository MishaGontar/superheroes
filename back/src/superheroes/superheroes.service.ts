import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateSuperheroDto } from "./dto/update-superhero.dto";
import { PrismaService } from "../prisma.service";
import { findAllPagination, fullIncludeData } from "./constans";
import {
  ISuperHeroDetail,
  ISuperHeroesPagination,
  ISuperHeroesPaginationDetails,
  ISuperHero,
} from "./interfaces";
import { CreateSuperheroDto } from "./dto/create-superhero.dto";
import { Images } from "../images/interfaces";

@Injectable()
export class SuperheroesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(superHero: CreateSuperheroDto): Promise<ISuperHero> {
    const isExistSuperhero = await this.prisma.superheroes.findFirst({
      where: { nickname: superHero.nickname },
    });

    if (isExistSuperhero) {
      throw new ConflictException(
        `Superhero with nickname '${superHero.nickname}' already exists.`,
      );
    }

    return this.prisma.superheroes.create({
      data: superHero,
    });
  }

  async findAll(page = 1, limit = 5): Promise<ISuperHeroesPaginationDetails> {
    const skip: number = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.superheroes.findMany(findAllPagination(skip, limit)),
      this.prisma.superheroes.count(),
    ]);
    const readyData: ISuperHeroesPagination[] = data.map((superhero) =>
      this.getPrettySuperHeroObj(superhero),
    );

    return {
      superheroes: readyData,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<ISuperHeroDetail> {
    const superhero = await this.prisma.superheroes.findUnique({
      where: { id },
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
  ): Promise<ISuperHeroDetail> {
    const superhero = await this.prisma.superheroes.update({
      where: { id },
      data: updateSuperheroDto,
      include: fullIncludeData,
    });
    return this.getPrettySuperHeroObj(superhero);
  }

  async remove(id: number): Promise<ISuperHero> {
    return this.prisma.superheroes.delete({ where: { id } });
  }

  private getPrettySuperHeroObj(superhero) {
    return {
      ...superhero,
      images: superhero.images.map((i: { image: Images }) => ({ ...i.image })),
    };
  }
}
