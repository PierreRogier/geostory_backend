import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StoryService } from '@services';
import { UpdateStoryDto } from '@core/dtos';
import { UserJwtAuthGuard } from '@guards';

@UseGuards(UserJwtAuthGuard)
@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Get('/')
  findAllStories() {
    return this.storyService.findAllStories();
  }

  @Get(':storyId')
  findStoryById(@Param('storyId') storyId: string) {
    return this.storyService.findStoryById(+storyId);
  }

  @Patch(':storyId')
  updateStory(
    @Param('storyId') storyId: string,
    @Body() updateStoryDto: UpdateStoryDto,
  ) {
    return this.storyService.updateStory(+storyId, updateStoryDto);
  }

  @Delete(':storyId')
  removeStory(@Param('storyId') storyId: string) {
    return this.storyService.removeStory(+storyId);
  }
}
