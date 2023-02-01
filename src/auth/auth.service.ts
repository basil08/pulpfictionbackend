import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import CONFIG from 'src/utils/config';
import { Admin, AdminDocument } from 'src/schemas/admin.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUsername(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username });
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      return payload;
    }

    return null;
  }

  async validateAdminUsername(username: string, password: string): Promise<any> {
  const user = await this.adminModel.findOne({ username: username });
  if (user && (await bcrypt.compare(password, user.password_hash))) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    return payload;
  }

  return null;
  }

  async createUser(password: string, username: string, email: string) {
    const t = await this.userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (t) {
      if (t.username === username) return 1;
      if (t.email === email) return 2;
    }
    const hash = await bcrypt.hash(password, CONFIG.BCRYPT_ROUNDS);

    const user = new this.userModel({
      email: email,
      username: username,
      password_hash: hash,
    });
    return user.save();
  }

  async loginUser(user) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async createAdmin(password: string, username: string, email: string) {
    const t = await this.adminModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (t) {
      if (t.username === username) return 1;
      if (t.email === email) return 2;
    }
    const hash = await bcrypt.hash(password, CONFIG.BCRYPT_ROUNDS);

    const user = new this.userModel({
      email: email,
      username: username,
      password_hash: hash,
    });
    return user.save();
  }

  async loginAdmin(user) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
