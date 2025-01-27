import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRepository } from './chat.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './entities/chat.entity';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, UploadFileFactoryService],
})
export class ChatModule {}
