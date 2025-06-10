/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { getUser, LoginUserDTO, RegisterUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // function for hashing password
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
  }

  async getUsers(dataQuery: getUser) {
    const data = await this.prisma.user.findMany({
      where: {
        fullName: {
          contains: dataQuery.search, // LIKE '%news%'
        },
      },
      skip: (dataQuery.page - 1) * dataQuery.limit,
      take: dataQuery.limit,
    });
    const count = await this.prisma.user.count({
      where: {
        fullName: {
          contains: dataQuery.search, // LIKE '%news%'
        },
      },
    });

    const totalPages = Math.ceil(count / dataQuery.limit);

    return {
      message: 'success get all user',
      data,
      meta: {
        total: count,
        page: dataQuery.page,
        limit: dataQuery.limit,
        totalPages,
      },
    };
  }

  async getUserById(id: string) {
    const data = await this.prisma.user.findUnique({
      where: { id },
    });

    return { message: 'success get all user', data };
  }

  async register(data: RegisterUserDto) {
    try {
      const checkEmail = await this.prisma.user.findFirst({
        where: {
          OR: [{ username: data.username }, { email: data.email }],
        },
      });

      if (checkEmail && checkEmail.username === data.username) {
        throw new ConflictException('Username already in use');
      }
      if (checkEmail && checkEmail.email === data.email) {
        throw new ConflictException('Email already in use');
      }

      const hashPassword = await this.hashPassword(data.password);
      data.password = hashPassword;

      const user = await this.prisma.user.create({ data });

      return {
        message: 'Register Successfully',
        data: user,
      };
    } catch (error) {
      console.log(error);
      throw new ConflictException(error.response);
    }
  }

  async login(data: LoginUserDTO) {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: { username: data.username },
      });

      if (!findUser) {
        throw new ConflictException('username not found');
      }

      // compare password
      const checkPassword = await bcrypt.compare(
        data.password,
        findUser?.password,
      );
      if (!checkPassword) {
        throw new ConflictException('Wrong Password');
      }

      const token = this.jwtService.sign({ userId: findUser.id });

      return {
        message: 'Login Successfully',
        data: token,
      };
      // create token
    } catch (error) {
      console.log(error);
      throw new ConflictException(error.response);
    }
  }
}
