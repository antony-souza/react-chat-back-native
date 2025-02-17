import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { MessageRepository } from 'src/modules/message/message.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Message,
  MessageSchema,
} from 'src/modules/message/entities/message.entity';
import { User, UserSchema } from 'src/modules/users/entities/user.entity';
import { MessageService } from 'src/modules/message/message.service';
import { Group, GroupSchema } from 'src/modules/group/entities/group.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [WebsocketGateway, MessageRepository, MessageService],
  exports: [],
})
export class WebsocketModule {}
