import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';
import { District, User } from '../entities';

export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsLatitude()
  @IsNotEmpty()
  latitude: string;

  @IsLongitude()
  @IsNotEmpty()
  longitude: string;

  district: District;

  author: User;
}

export class UpdateStoryDto extends PartialType(CreateStoryDto) {}
