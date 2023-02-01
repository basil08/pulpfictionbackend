import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from 'src/schemas/movie.schema';
import { Progress, ProgressSchema } from 'src/schemas/progress.schema';
import { Review, ReviewSchema } from 'src/schemas/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: Progress.name, schema: ProgressSchema },
      { name: Review.name, schema: ReviewSchema }
    ]),
  ],
  controllers: [CoreController],
  providers: [CoreService]
})
export class CoreModule {}
