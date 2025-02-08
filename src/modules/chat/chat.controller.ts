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
  findPrivateChat(@Param('users') users: string[]) {
    return this.chatService.findChatByUser(users);
  }
}
