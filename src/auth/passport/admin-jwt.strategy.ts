import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import CONFIG from 'src/utils/config';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONFIG.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    };
  }
}
