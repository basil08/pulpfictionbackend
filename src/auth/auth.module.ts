import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import CONFIG from 'src/utils/config';
import { UserJwtStrategy } from './passport/user-jwt.strategy';
import { UserLocalStrategy } from './passport/user-local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: CONFIG.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, UserLocalStrategy, UserJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
