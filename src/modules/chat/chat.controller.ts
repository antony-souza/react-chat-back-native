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
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('imgUrl'))
  create(
    @Body() createChatDto: CreateChatDto,
    @UploadedFile() imgUrl: Express.Multer.File,
  ) {
    return this.chatService.create({
      ...createChatDto,
      imgUrl: imgUrl,
    });
  }

  @Get('/all')
  findAll() {
    return this.chatService.findAll();
  }

  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Put('/join/:id/:users')
  joinChat(@Param('id') id: string, @Param('users') users: string[]) {
    return this.chatService.joinChat(id, users);
  }

  @Get('/users/:users')
  findChatByUsers(@Param('users') users: string[]) {
    return this.chatService.findGroupsByUser(users);
  }

  @Get('/private/:users')
  findPrivateFriendChat(@Param('users') users: string[]) {
    return this.chatService.findPrivateFriendChat(users);
  }

  @Get('/infochat/:id')
  findChatInfo(@Param('id') id: string) {
    return this.chatService.getInfoChatAndUser(id);
  }

  @Put('/remove/:id/:userId/:admin')
  removeUserFromChat(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Param('admin') adminId: string,
  ) {
    return this.chatService.removeUserFromChat(id, userId, adminId);
  }
}
