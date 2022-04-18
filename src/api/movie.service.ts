import { MovieGenre } from './../models/movieGenre.model';
import { httpRequestInstance } from "./httpRequest";

export class MovieService {
	public genreList() {
		return httpRequestInstance.get<MovieGenre[]>(MovieGenre, '/movieGenre');
	}
}