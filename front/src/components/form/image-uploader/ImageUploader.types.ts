export interface ChooseImageBtnProps {
    images?: ImageItem[];
}

export interface ImageItem {
    id: number | string;
    file?: File;
    url: string;
    isUploaded: boolean;
}