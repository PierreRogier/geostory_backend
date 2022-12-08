import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from '@core/entities';
import { DistrictService } from '@services';
import { UserModule } from '../user/user.module';
import { StoryModule } from '../story/story.module';

@Module({
  imports: [TypeOrmModule.forFeature([District]), UserModule, StoryModule],
  providers: [DistrictService],
  exports: [DistrictService],
})
export class DistrictModule {}
