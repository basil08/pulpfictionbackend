import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { BadRequestException } from '@nestjs/common';
import { AdminLocalGuard } from 'src/auth/passport/admin-local.guard';
import { AdminAuthGuard } from 'src/auth/passport/admin-auth.guard';
import { Request as ExpressRequest } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly authService: AuthService) {}

  @Post('createAdmin')
  async createAdmin(@Body() CreateAdminDto: CreateAdminDto) {
    const { password, email, username } = CreateAdminDto;
    const u = await this.authService.createAdmin(password, username, email);

    if (u === 1) {
      throw new BadRequestException('Username already exists');
    }

    if (u === 2) {
      throw new BadRequestException('Email already exists');
    }

    return { user_id: u._id, message: 'User successfully created!' };
  }

  @UseGuards(AdminLocalGuard)
  @Post('loginAdmin')
  async loginAdmin(@Req() req: ExpressRequest) {
    return this.authService.loginAdmin(req.user);
  }

  @UseGuards(AdminAuthGuard)
  @Get('getAdminProfile')
  async getAdminProfile(@Req() req: ExpressRequest) {
    return req.user;
  }
}
