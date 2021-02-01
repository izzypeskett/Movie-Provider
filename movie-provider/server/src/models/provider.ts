import { IMovie } from './movie';

export interface IProvider extends IMovie {
  Provider: string;
  Movies: IMovie[];
}

