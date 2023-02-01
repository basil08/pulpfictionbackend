import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from 'src/schemas/movie.schema';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class CoreService {

  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  // CRUD MOVIE
  async getMovie(id: string) {
    if (id) {
      const movie = await this.movieModel.findOne({ _id: id });
      if (!movie)
        throw new BadRequestException("No Movie with this movie id!");
      return movie;
    }
    throw new BadRequestException("getMovie was called without any id argument");
  }

  async createMovie(
    title: string,
    language: string,
    summary: string,
    release_year: number,
    release_date: Date,
    directors: [string],
    trailer_video_url: string,
    genres: [string],
    tags: [string],
    imdb_rating: number,
    runtime: number,
    poster_url: string,
    user_id: string
  ) {
    const thisTime = new Date();
      const movie = new this.movieModel({
        title,
        language,
        summary,
        release_year,
        release_date,
        directors,
        trailer_video_url,
        genres,
        tags,
        imdb_rating,
        runtime,
        poster_url,
        created_by: user_id,
        created_at: thisTime
      });
      return movie.save();
  }

  async updateMovie(

  ) {

  }

  async deleteMovie(id: string) {
    return await this.movieModel.remove({ _id: id });
  }
  // END CRUD MOVIE

  async getMovies(skip: number, limit: number) {
    const findAllQuery = this.movieModel
      .find()
      .sort({ _id: -1 })
      .skip(skip);

    if (limit) {
      findAllQuery.limit(limit);
    }

    const movies = await findAllQuery;
    const count = await this.movieModel.count();

    return { movies, count };
  }


  // Protected route

  async createMovies(body: any[], user_id: string) {
    const thisTime = new Date();
    const response = await this.movieModel.insertMany(body.map((item) => {return {...item, created_at: thisTime, created_by: user_id}}));
    return {count: response.length};
  }
}
