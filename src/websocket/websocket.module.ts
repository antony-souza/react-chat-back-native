import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { MessageRepository } from 'src/modules/message/message.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Message,
  MessageSchema,
} from 'src/modules/message/entities/message.entity';
import { User, UserSchema } from 'src/modules/users/entities/user.entity';
import { Chat, ChatSchema } from 'src/modules/chat/entities/chat.entity';
import { MessageService } from 'src/modules/message/message.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [WebsocketGateway, MessageRepository, MessageService],
  exports: [],
})
export class WebsocketModule {}
