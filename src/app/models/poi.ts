export class Poi {

    _id : string;
    photos: string[];
    postedBy: string;
    pos: {
        coordinates: number[];
        type: string;
    };
    title: string;
    description: string;
    dateAdd: string;
    categorie: string;
    averageRating: number;
    updatedAt: string;
    postedByUsername: Username[];
    city?: string;
}

export interface ListResponse<T> {
    page: number;
    pageSize: number;
    total: number;
    data: T[];
}

export interface Username {
    _id: string;
    username: string;
    email: string;
    imgProfil: string;
}