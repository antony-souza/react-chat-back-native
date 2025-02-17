import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/chat')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('imgUrl'))
  create(
    @Body() dto: CreateGroupDto,
    @UploadedFile() imgUrl: Express.Multer.File,
  ) {
    return this.groupService.create({
      ...dto,
      imgUrl: imgUrl,
    });
  }

  @Get('/all')
  findAll() {
    return this.groupService.findAll();
  }

  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Put('/join/:id/:users')
  joinChat(@Param('id') id: string, @Param('users') users: string[]) {
    return this.groupService.joinChat(id, users);
  }

  @Get('/users/:users')
  findChatByUsers(@Param('users') users: string[]) {
    return this.groupService.findGroupsByUser(users);
  }

  @Get('/infochat/:id')
  findChatInfo(@Param('id') id: string) {
    return this.groupService.getInfoChatAndUser(id);
  }

  @Put('/remove/:id/:userId/:admin')
  removeUserFromChat(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Param('admin') adminId: string,
  ) {
    return this.groupService.removeUserFromChat(id, userId, adminId);
  }
}
