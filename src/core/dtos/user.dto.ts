import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { District } from '../entities';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  userRole: string;

  district: District;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
