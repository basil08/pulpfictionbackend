import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import CONFIG from './utils/config';

const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/pulpfiction';

@Module({
  imports: [
    MongooseModule.forRoot(CONFIG.MONGODB_URI || LOCAL_MONGODB_URI),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
