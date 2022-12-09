import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DistrictService, UserService, StoryService } from '@services';
import {
  CreateDistrictDto,
  UpdateDistrictDto,
  CreateUserDto,
  CreateStoryDto,
} from '@core/dtos';
import { UserJwtAuthGuard } from '@guards';
import { RequestWithUser } from '@core/interfaces';

@Controller('districts')
export class DistrictController {
  constructor(
    private readonly districtService: DistrictService,
    private readonly userService: UserService,
    private readonly storyService: StoryService,
  ) {}

  // District
  @Post()
  createDistrict(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.createDistrict(createDistrictDto);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get()
  findAllDistricts() {
    return this.districtService.findAllDistricts();
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':districtId')
  findOneDistrictById(@Param('districtId') districtId: string) {
    return this.districtService.findDistrictById(+districtId);
  }

  @UseGuards(UserJwtAuthGuard)
  @Patch(':districtId')
  updateDistrict(
    @Param('districtId') districtId: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.updateDistrict(+districtId, updateDistrictDto);
  }

  @UseGuards(UserJwtAuthGuard)
  @Delete(':districtId')
  removeDistrict(@Param('districtId') districtId: string) {
    return this.districtService.removeDistrict(+districtId);
  }

  // User
  @UseGuards(UserJwtAuthGuard)
  @Post(':districtId/users')
  createUserInDistrict(
    @Param('districtId') districtId: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.districtService.createUserInDistrict(
      +districtId,
      createUserDto,
    );
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':districtId/users')
  findAllUser(@Param('districtId') districtId: string) {
    return this.userService.findAllUsersInDistrict(+districtId);
  }

  // Story
  @UseGuards(UserJwtAuthGuard)
  @Post(':districtId/stories')
  createStoryInDistrict(
    @Param('districtId') districtId: string,
    @Body() createStoryDto: CreateStoryDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    return this.districtService.createStoryInDistrict(
      +districtId,
      +user.id,
      createStoryDto,
    );
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':districtId/stories')
  findAllStories(@Param('districtId') districtId: string) {
    return this.storyService.findAllStoriesInDistrict(+districtId);
  }
}
