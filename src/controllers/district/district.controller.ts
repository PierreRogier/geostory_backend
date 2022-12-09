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
import { DistrictService, UserService } from '@services';
import {
  CreateDistrictDto,
  UpdateDistrictDto,
  CreateUserDto,
} from '@core/dtos';
import { UserJwtAuthGuard } from '@guards';

@Controller('districts')
export class DistrictController {
  constructor(
    private readonly districtService: DistrictService,
    private readonly userService: UserService,
  ) {}

  // District
  @Post()
  createDistrict(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.createDistrict(createDistrictDto);
  }

  @Get()
  findAllDistricts() {
    return this.districtService.findAllDistricts();
  }

  @Get(':districtId')
  findOneDistrictById(@Param('districtId') districtId: string) {
    return this.districtService.findDistrictById(+districtId);
  }

  @Patch(':districtId')
  updateDistrict(
    @Param('districtId') districtId: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.updateDistrict(+districtId, updateDistrictDto);
  }

  @Delete(':districtId')
  removeDistrict(@Param('districtId') districtId: string) {
    return this.districtService.removeDistrict(+districtId);
  }

  // User
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

  @Get(':districtId/users')
  findAllUser(@Param('districtId') districtId: string) {
    return this.userService.findAllUsersInDistrict(+districtId);
  }
}
