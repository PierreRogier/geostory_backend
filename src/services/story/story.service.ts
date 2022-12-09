import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '@core/entities';
import { CreateStoryDto, UpdateStoryDto } from '@core/dtos';
import { PostgresErrorsCode } from '@errors';
import {
  UniqueStoryException,
  ServerException,
  StoryNotFoundException,
} from '@exceptions';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
  ) {}
  async createStory(createStoryDto: CreateStoryDto) {
    const newStory = await this.storyRepository.create(createStoryDto);
    try {
      await this.storyRepository.save(newStory);
      return newStory;
    } catch (error) {
      if (error?.code === PostgresErrorsCode.UniqueViolation) {
        throw new UniqueStoryException();
      }
      throw new ServerException();
    }
  }

  async findAllStories() {
    const stories = this.storyRepository.find();
    return stories;
  }

  async findAllStoriesInDistrict(districtId: number) {
    const stories = this.storyRepository.find({
      where: { district: { id: districtId } },
    });
    return stories;
  }

  async findStoryById(storyId: number) {
    const story = await this.storyRepository.findOne({
      where: { id: storyId },
    });
    if (!!story) return story;
    throw new StoryNotFoundException();
  }

  async updateStory(storyId: number, updateStoryDto: UpdateStoryDto) {
    await this.storyRepository.update({ id: storyId }, updateStoryDto);
    return await this.findStoryById(storyId);
  }

  async removeStory(storyId: number) {
    const deletedStoryRole = await this.storyRepository.delete({
      id: storyId,
    });
    if (!deletedStoryRole.affected) {
      throw new StoryNotFoundException();
    }
  }
}
