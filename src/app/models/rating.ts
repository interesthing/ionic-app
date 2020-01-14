import { User } from './user';

export class Rating {
    _id: string;
    postedBy: string;
    poi: string;
    value: number;
    comment: string;
    dateAdd: string;
    user?: User;
}

export interface RatingList<Rating>{
  filter(arg0: (res: any) => void);
    data: object;
    length: number;
}
