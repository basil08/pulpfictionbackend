import { User } from 'src/schemas/user.schema';

export class CreateMovieDto {
  // @IsNotEmpty()
  title: string;

  // @IsOptional()
  language: string;

  // @IsOptional()
  // @IsString()
  summary: string;

  // @IsNotEmpty()
  // @IsNumber()
  release_year: number;

  // @IsOptional()
  // @IsDate()
  release_date: Date;

  // @IsOptional()
  // @IsArray()
  directors: [string];

  // @IsOptional()
  // @IsUrl()
  trailer_video_url: string;

  // @IsOptional()
  // @IsArray()
  genres: [string];

  // @IsOptional()
  // @IsArray()
  tags: [string];

  // @IsOptional()
  // @IsNumber()
  imdb_rating: number;

  // @IsOptional()
  // @IsNumber()
  runtime: number;

  // @IsOptional()
  // @IsUrl()
  poster_url: string;

  // @IsNotEmpty()
  // @IsMongoId()
  created_by: User;

  // @IsNotEmpty()
  // @IsDate()
  created_at: Date;

  // @IsOptional()
  // @IsDate()
  last_updated: Date;
}
