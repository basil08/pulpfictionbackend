import {
  Controller,
  Req,
  Get,
  Param,
  Post,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { CoreService } from './core.service';
import { Request as ExpressRequest } from 'express';
import { Body, UseGuards } from '@nestjs/common/decorators';
import { UserAuthGuard } from 'src/auth/passport/user-auth.guard';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { AdminAuthGuard } from 'src/auth/passport/admin-auth.guard';

@Controller('api')
@UseGuards(UserAuthGuard)
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  // CRUD on Movies
  @Get('getMovie')
  async getMovie(@Param('id') id: string) {
    return this.coreService.getMovie(id);
  }

  @Post('createMovie')
  async createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @Req() req: ExpressRequest,
  ) {
    const {
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
    } = createMovieDto;
    const user_id = req.user.id;
    return this.coreService.createMovie(
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
      user_id,
    );
  }

  @Get('getMovies')
  async getMovies(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.coreService.getMovies(skip, limit);
  }

  @Delete('deleteMovie')
  @UseGuards(AdminAuthGuard)
  async deleteMovie(@Query('id') id: string) {
    return `Delete movie with id ${id}`;
  }

  @Post('createMovies')
  @UseGuards(AdminAuthGuard)
  async createMovies(@Body() _body: any[], @Req() req: ExpressRequest) {
    return this.coreService.createMovies(_body, req.user.id);
  }
}
