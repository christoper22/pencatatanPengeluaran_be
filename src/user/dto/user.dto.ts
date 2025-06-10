import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  Matches,
} from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Must be String' })
  username: string;

  @IsString({ message: 'Must be String' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Must be String' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Full Name is required' })
  fullName: string;

  @IsString({ message: 'Must be String' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).*$/, {
    message: 'Password harus mengandung minimal 1 angka dan 1 simbol',
  })
  password: string;
}

export interface getUser {
  search: string;
  page: number;
  limit: number;
}
