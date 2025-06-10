/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { LoginUserDTO, RegisterUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: any) {
    const { search, page, limit } = query;

    return this.userService.getUsers({
      search: search !== '' && search ? search : undefined,
      page: page !== '' && page ? parseInt(page) : 1,
      limit: limit !== '' && limit ? parseInt(limit) : 10,
    });
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
