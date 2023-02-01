import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ default: "English" })
  language: string;

  @Prop({ default: "" })
  summary: string;

  @Prop({ required: true })
  release_year: Number;

  @Prop({ default: null })
  release_date: Date;

  @Prop({ default: [] })
  directors: [string];

  @Prop({ default: ""})
  trailer_video_url: string;

  @Prop({ default: [] })
  genres: [string];

  @Prop({ default: [] })
  tags: [string];

  @Prop({ default: 0 })
  imdb_rating: number;

  @Prop({ default: 0 })
  runtime: number;

  @Prop({ default: "" })
  poster_url: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  })
  created_by: User;

  @Prop({ required: true })
  created_at: Date;

  @Prop({ default: null })
  last_updated: Date;
}

export type MovieDocument = Movie & Document;
export const MovieSchema = SchemaFactory.createForClass(Movie);
