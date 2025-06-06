import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Must be String' })
  username: string;

  @IsString({ message: 'Must be String' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;
}
