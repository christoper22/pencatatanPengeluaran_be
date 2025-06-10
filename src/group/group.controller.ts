/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
  @Post()
  CreateGroup(@Body() data: groupDto, @Req() req) {
    return this.groupService.createGroup(data, req.user.userId);
  }
  //   @Patch(':id')
  //   updateGroup(@Param('id') id:string, @Body()) {
  //   }
}
