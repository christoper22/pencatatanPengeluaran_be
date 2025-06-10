/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { groupDto } from './dto/group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(dataGroup: groupDto, userId: string) {
    try {
      const checkGroupName = await this.prisma.group.findFirst({
        where: { groupName: dataGroup.groupName },
      });

      if (checkGroupName) {
        throw new ConflictException('Group Name already exist');
      }

      const group = await this.prisma.group.create({
        data: { groupName: dataGroup.groupName, userId },
      });

      return { message: 'success create Group', data: group };
    } catch (error) {
      console.log(error);
      throw new ConflictException(error.response);
    }
  }
}
