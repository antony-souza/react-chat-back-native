import { ConflictException, Injectable, Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageRepository } from 'src/modules/message/message.repository';

interface ISendMessage {
  groupId: string;
  groupName: string;
  message: string;
  userName: string;
  userImg: string;
  userId: string;
}

@Injectable()
@WebSocketGateway({ cors: true })
export class WebsocketGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GatewaySocket');

  constructor(private readonly messageRepository: MessageRepository) {}

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinGroup')
  async handleJoinGroup(client: Socket, groupId: string) {
    if (!groupId) {
      this.logger.error(`Invalid groupId provided by client ${client.id}`);
      return;
    }

    const rooms = Array.from(client.rooms);
    if (rooms.includes(groupId)) {
      this.logger.warn(`Client ${client.id} is already in group ${groupId}`);
      return;
    }

    await client.join(groupId);
    this.logger.log(`Client ${client.id} joined group ${groupId}`);
  }

  @SubscribeMessage('leaveGroup')
  async handleLeaveGroup(client: Socket, groupName: string) {
    if (!groupName) {
      this.logger.error(`Invalid groupName provided by client ${client.id}`);
      return;
    }
    await client.leave(groupName);
    this.logger.log(`Client ${client.id} left store ${groupName}`);
  }

  @SubscribeMessage('sendMessage')
  async sendMessageForGroup(
    client: Socket,
    { groupName, groupId, message, userImg, userId, userName }: ISendMessage,
  ) {
    if (!groupName || !message) {
      this.logger.error(`Invalid data provided by client ${client.id}`);
      return;
    }

    try {
      const savedMessageDb = await this.messageRepository.create({
        chatId: groupId,
        userId: userId,
        message: message,
        userImgUrl: userImg,
        userName: userName,
      });

      if (!savedMessageDb) {
        throw new ConflictException('Failed to save message');
      }

      this.server.to(groupId).emit('msgGroup', {
        clientId: userId,
        message: message,
        userImg: userImg,
        userId: userId,
        userName: userName,
      });

      this.logger.log(
        `Client ${userName} sent message to group ${groupName}: ${message}`,
      );
    } catch {
      this.logger.error(
        `Failed to save or send message for client ${client.id}`,
      );
    }
  }
}
