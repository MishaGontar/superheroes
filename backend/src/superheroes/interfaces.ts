import { Images } from "../images/interfaces";

export interface ISuperHero {
  id: number;
  nickname: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
  superpowers: string;
}

export interface ISuperHeroDetail extends ISuperHero {
  images: {
    image: Images[];
  };
}

export interface ISuperHeroesPagination {
  id: number;
  nickname: string;
  images: Images[];
}

export interface ISuperHeroesPaginationDetails {
  superheroes: ISuperHeroesPagination[];
  total: number;
  page: number;
  lastPage: number;
}
