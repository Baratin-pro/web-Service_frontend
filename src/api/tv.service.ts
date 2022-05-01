import { TvByGenre } from '@/models/tvByGenre.model';
import { TvGenre } from './../models/tvGenre.model';

import { httpRequestInstance } from "./httpRequest";

export class TvService {
    public genreList() {
        return httpRequestInstance.get<TvGenre[]>(TvGenre, '/tvGenre');
    }
    public getByGenreId(genreId: number) {
        return httpRequestInstance.get<TvByGenre>(TvByGenre, `/tvGenre/${genreId}`);
    }

}