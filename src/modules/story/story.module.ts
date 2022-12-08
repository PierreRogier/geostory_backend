import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from '@core/entities';
import { StoryService } from '@services';

@Module({
  imports: [TypeOrmModule.forFeature([Story])],
  providers: [StoryService],
  exports: [StoryService],
})
export class StoryModule {}
