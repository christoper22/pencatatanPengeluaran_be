import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class groupDto {
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Group name required' })
  groupName: string;

  @IsArray()
  userId: string[];
}

export class GetGroupsDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value !== '' && value ? value : undefined)) // Convert empty string to undefined
  search?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => (value !== '' && value ? parseInt(value) : 1)) // Default to 1
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => (value !== '' && value ? parseInt(value) : 10)) // Default to 10
  limit?: number = 10;
}
