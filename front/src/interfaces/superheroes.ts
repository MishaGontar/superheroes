import {IImage} from "./image.ts";
import {ImageItem} from "../components/form/image-uploader/ImageUploader.types.ts";

export interface ISuperheroDetails {
    id: number;
    nickname: string;
    originDescription: string;
    realName: string;
    catchPhrase: string;
    superpowers: string;
    images: IImage[]
}

export type SuperheroTypesInfo = ISuperheroInformation;

export interface ISuperheroInformation {
    nickname: string;
    realName: string;
    originDescription: string;
    catchPhrase: string;
    superpowers: string;
    images: ImageItem[];
}

export interface ISuperheroItemCard {
    id: number;
    nickname: string;
    images: IImage[]
}

