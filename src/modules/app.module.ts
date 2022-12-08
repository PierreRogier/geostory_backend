import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validationSchema } from '@configuration';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { DistrictModule } from './district/district.module';
import { StoryModule } from './story/story.module';
import { AuthModule } from './auth/auth.module';
import {
  AppController,
  AuthController,
  DistrictController,
  StoryController,
  UserController,
} from '@controllers';
import { AppService } from '@services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema }),
    DatabaseModule,
    UserModule,
    DistrictModule,
    StoryModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    AuthController,
    DistrictController,
    StoryController,
    UserController,
  ],
  providers: [AppService],
})
export class AppModule {}
