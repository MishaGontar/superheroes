export interface ISuperHeroDetails {
    id: number;
    nickname: string;
    originDescription: string;
    realName: string;
    catchPhrase: string;
    superpowers: string;
    images: Images[]
}

export interface Images {
    id: number;
    originalName: string;
    path: string;
}