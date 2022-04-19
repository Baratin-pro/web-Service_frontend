import { MovieByGenre } from '@/models/movieByGenre.model';
import { MovieGenre } from './../models/movieGenre.model';
import { httpRequestInstance } from "./httpRequest";

export class MovieService {
	public genreList() {
		return httpRequestInstance.get<MovieGenre[]>(MovieGenre, '/movieGenre');
	}
	public getByGenreId(genreId: number) {
		return httpRequestInstance.get<MovieByGenre>(MovieByGenre, `/movieGenre/${genreId}`);
	}
}