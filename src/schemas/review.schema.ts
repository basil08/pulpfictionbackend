import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Movie } from './movie.schema';
import { User } from './user.schema';

@Schema()
export class Review {
  @Prop({ default: "New Review" })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  rating: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  })
  movie: Movie;

  @Prop({ required: true })
  created_at: Date;

  // TODO: Uncomment when feature to edit reviews are added
  // @Prop({ default: null })
  // last_updated: Date;

}

export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
