/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { groupDto } from './dto/group.dto';
import { GroupService } from './group.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: any) {
    const { search, page, limit } = query;

    return this.groupService.getAllGroup({
      search: search !== '' && search ? search : undefined,
      page: page !== '' && page ? parseInt(page) : 1,
      limit: limit !== '' && limit ? parseInt(limit) : 10,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  CreateGroup(@Body() data: groupDto, @Req() req) {
    return this.groupService.createGroup(data, req.user.userId);
  }
}
