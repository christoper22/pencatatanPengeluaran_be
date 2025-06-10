import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class groupDto {
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Group name required' })
  groupName: string;

  @IsArray()
  userId: string[];
}
