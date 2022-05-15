import { SourceService } from './source.service';
import { UserService } from './user.service';
import { TvService } from './tv.service';
import { MovieService } from './movie.service';

// Group every API services
export const api = {
  movie: new MovieService(),
  tv: new TvService(),
  user: new UserService(),
  source: new SourceService(),
}