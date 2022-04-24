import { TvGenre } from './../models/tvGenre.model';

import { httpRequestInstance } from "./httpRequest";

export class TvService {
    public genreList() {
        return httpRequestInstance.get<TvGenre[]>(TvGenre, '/tvGenre');
    }

}