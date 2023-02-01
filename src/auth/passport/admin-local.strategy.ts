import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'admin-local',
) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<any> {
    const admin = await this.authService.validateAdminUsername(username, password);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
