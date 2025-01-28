import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor(''))
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get('/all/:chatId')
  findAllMessagesByChatId(@Param('chatId') chatId: string) {
    return this.messageService.findAllMessagesByChatId(chatId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
