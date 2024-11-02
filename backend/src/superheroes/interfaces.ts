import {IImage, ImageHero} from "../images/interfaces";

export interface ISuperhero {
    id: number;
    nickname: string;
    realName: string;
    originDescription: string;
    catchPhrase: string;
    superpowers: string;
}

export interface ISuperheroFullDetail extends ISuperhero {
    images: ImageHero[]
}

export interface ISuperheroDetail extends ISuperhero {
    images: IImage[];
}

export interface ISuperheroItemList {
    id: number;
    nickname: string;
    images: IImage[];
}

export interface ISuperheroesListPage {
    superheroes: ISuperheroItemList[];
    total: number;
    page: number;
    lastPage: number;
}
