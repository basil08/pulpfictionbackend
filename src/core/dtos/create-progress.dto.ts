import { User } from 'src/schemas/user.schema';
import { Movie } from 'src/schemas/movie.schema';

export class CreateProgressDto {

  have_watched: boolean;

  on_watchlist: boolean;

  user_id: string;

  movie_id: string;

  first_watch: Date;

  is_reviewed: boolean;

  last_updated: Date;

  review_count: number;
}