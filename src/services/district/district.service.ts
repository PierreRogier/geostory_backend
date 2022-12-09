import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from '@core/entities';
import {
  CreateDistrictDto,
  UpdateDistrictDto,
  CreateUserDto,
  CreateStoryDto,
} from '@core/dtos';
import { UserRoles } from '@core/enums';
import {
  UniqueDistrictException,
  ServerException,
  DistrictNotFoundException,
} from '@exceptions';
import { PostgresErrorsCode } from '@errors';
import { UserService } from '../user/user.service';
import { StoryService } from '../story/story.service';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    private readonly userService: UserService,
    private readonly storyService: StoryService,
  ) {}

  // District
  async createDistrict(districtData: CreateDistrictDto): Promise<District> {
    const newDistrict = await this.districtRepository.create(districtData);
    try {
      await this.districtRepository.save(newDistrict);
      await this.userService.createUser({
        email: `admin${newDistrict.zip_code}@gmail.com`,
        password: `motdepasse${newDistrict.zip_code}`,
        firstname: `prenom${newDistrict.zip_code}`,
        lastname: `nom${newDistrict.zip_code}`,
        userRole: UserRoles.ADMIN,
        district: newDistrict,
      });
      return newDistrict;
    } catch (error) {
      if (error?.code === PostgresErrorsCode.UniqueViolation) {
        throw new UniqueDistrictException();
      }
      throw new ServerException();
    }
  }

  async findAllDistricts(): Promise<District[]> {
    return await this.districtRepository.find();
  }

  async findDistrictById(districtId: number) {
    const district = await this.districtRepository.findOne({
      where: { id: districtId },
    });
    if (!!district) return district;
    throw new DistrictNotFoundException();
  }

  async findDistrictByZipCode(zip_code: string) {
    const district = await this.districtRepository.findOneBy({ zip_code });
    if (!!district) return district;
    throw new DistrictNotFoundException();
  }

  async updateDistrict(districtId: number, districtData: UpdateDistrictDto) {
    await this.districtRepository.update({ id: districtId }, districtData);
    return await this.findDistrictById(districtId);
  }

  async removeDistrict(id: number) {
    const deletedDistrict = await this.districtRepository.delete(id);
    if (!deletedDistrict.affected) {
      throw new DistrictNotFoundException();
    }
  }

  // User
  async createUserInDistrict(districtId: number, createUserDto: CreateUserDto) {
    const district = await this.findDistrictById(districtId);
    const newUser = await this.userService.createUser({
      ...createUserDto,
      userRole: UserRoles.EDITOR,
      district,
    });
    return newUser;
  }

  // Story
  async createStoryInDistrict(
    districtId: number,
    userId: number,
    createStoryDto: CreateStoryDto,
  ) {
    const district = await this.findDistrictById(districtId);
    const user = await this.userService.findUserById(userId);
    const newStory = await this.storyService.createStory({
      ...createStoryDto,
      author: user,
      district,
    });
    return newStory;
  }
}
