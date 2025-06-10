/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetGroupsDto, groupDto } from './dto/group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getAllGroup(dataGroup: GetGroupsDto) {
    try {
      const getData = await this.prisma.group.findMany({
        where: { groupName: dataGroup.search },
        // skip: (dataGroup.page - 1) * dataGroup.limit,
        take: dataGroup.limit,
      });

      const count = await this.prisma.group.count({
        where: { groupName: dataGroup.search },
      });

      // const totalPages = Math.ceil(count / dataGroup.limit);

      return {
        message: 'Success get All Data',
        data: getData,
        meta: {
          total: count,
          page: dataGroup.page,
          limit: dataGroup.limit,
          // totalPages,
        },
      };
    } catch (error) {
      console.log(error);
      throw new ConflictException(error.response);
    }
  }

  async createGroup(dataGroup: groupDto, userId: string) {
    try {
      const checkGroupName = await this.prisma.group.findFirst({
        where: { groupName: dataGroup.groupName },
      });

      if (checkGroupName) {
        throw new ConflictException('Group Name already exist');
      }
      let group;

      await this.prisma.$transaction(async (tsx) => {
        group = await tsx.group.create({
          data: { groupName: dataGroup.groupName, userId },
        });

        for (const userId of dataGroup.userId) {
          await tsx.connection.create({
            data: { groupId: group.id, userId: userId },
          });
        }
      });
      return { message: 'success create Group', data: group };
    } catch (error) {
      console.log(error);
      throw new ConflictException(error.response);
    }
  }
}
