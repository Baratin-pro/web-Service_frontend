import { TvService } from './tv.service';
import { MovieService } from './movie.service';

// Group every API services
export const api = {
	movie: new MovieService(),
	tv: new TvService(),

}