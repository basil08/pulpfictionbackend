import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common/exceptions';
import { AuthService } from './auth.service';
import { UserLocalGuard } from './passport/user-local,guard';
import { Request as ExpressRequest } from 'express';
import { UserAuthGuard } from './passport/user-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { password, email, username } = createUserDto;
    const u = await this.authService.createUser(password, username, email);

    if (u === 1) {
      throw new BadRequestException('Username already exists');
    }

    if (u === 2) {
      throw new BadRequestException('Email already exists');
    }

    return { user_id: u._id, message: 'User successfully created!' };
  }

  @UseGuards(UserLocalGuard)
  @Post('loginUser')
  async loginUser(@Req() req: ExpressRequest) {
    return this.authService.loginUser(req.user);
  }

  @UseGuards(UserAuthGuard)
  @Get('getUserProfile')
  async getUserProfile(@Req() req: ExpressRequest) {
    return req.user;
  }
}

// interface IGetUserRequest extends ExpressRequest {
//   user: {
//     email: string;
//     id: string;
//     username: string;
//   };
// }
