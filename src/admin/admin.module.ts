import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthService } from 'src/auth/auth.service';
import { AdminLocalStrategy } from 'src/auth/passport/admin-local.strategy';
import { AdminJwtStrategy } from 'src/auth/passport/admin-jwt.strategy';

@Module({
  controllers: [AdminController],
  providers: [AuthService, AdminService, AdminJwtStrategy, AdminLocalStrategy]
})
export class AdminModule {}
