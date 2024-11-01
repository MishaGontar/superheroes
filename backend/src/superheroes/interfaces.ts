import { Image } from "../images/interfaces";

export interface ISuperhero {
  id: number;
  nickname: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
  superpowers: string;
}

export interface ISuperheroDetail extends ISuperhero {
  images: {
    image: Image[];
  };
}

export interface ISuperheroItemList {
  id: number;
  nickname: string;
  images: Image[];
}

export interface ISuperheroesListPage {
  superheroes: ISuperheroItemList[];
  total: number;
  page: number;
  lastPage: number;
}
