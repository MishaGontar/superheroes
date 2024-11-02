export interface IImage {
    id: number;
    path: string;
    originalName: string;
}

export interface ImageHero {
    superheroId: number;
    imageId: number;
    image: IImage
}