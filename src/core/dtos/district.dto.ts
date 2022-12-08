import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDistrictDto {
  @IsString()
  @IsNotEmpty()
  districtName: string;

  @IsString()
  @IsNotEmpty()
  zip_code: string;
}

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}
