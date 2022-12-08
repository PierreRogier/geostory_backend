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
import { UserService } from '@services';
import { UpdateUserDto } from '@core/dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':userId')
  findUserById(@Param('userId') userId: string) {
    return this.userService.findUserById(+userId);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(+userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.userService.removeUser(+userId);
  }
}
