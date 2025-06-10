/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: any) {
    const { search } = query;
    return this.userService.getUsers(search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post('register')
  register(@Body() register: RegisterUserDto) {
    return this.userService.register(register);
  }

  @Post('login')
  login(@Body() login: LoginUserDTO) {
    return this.userService.login(login);
  }
}
