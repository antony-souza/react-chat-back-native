import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
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

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
