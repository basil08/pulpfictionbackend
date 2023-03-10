import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Movie } from './movie.schema';
import { User } from './user.schema';

@Schema()
export class Progress {
  @Prop({ default: false })
  have_watched: boolean;

  @Prop()
  on_watchlist: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  })
  movie: Movie;

  @Prop({ default: null })
  first_watch: Date;

  @Prop({ default: false })
  is_reviewed: boolean;

  @Prop({ default: null })
  last_updated: Date;
}

export type ProgressDocuement = Progress & Document;
export const ProgressSchema = SchemaFactory.createForClass(Progress);
