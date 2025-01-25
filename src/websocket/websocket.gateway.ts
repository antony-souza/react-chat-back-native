import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

interface ISendMessage {
  groupName: string;
  message: string;
  userName: string;
  userImg: string;
  userId: string;
}

@WebSocketGateway({ cors: true })
export class WebsocketGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GatewaySocket');

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinGroup')
  async handleJoinGroup(client: Socket, groupName: string) {
    if (!groupName) {
      this.logger.error(`Invalid groupName provided by client ${client.id}`);
      return;
    }

    const rooms = Array.from(client.rooms);
    if (rooms.includes(groupName)) {
      this.logger.warn(`Client ${client.id} is already in group ${groupName}`);
      return;
    }

    await client.join(groupName);
    this.logger.log(`Client ${client.id} joined group ${groupName}`);
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
  sendMessageForGroup(
    client: Socket,
    { groupName, message, userImg, userId, userName }: ISendMessage,
  ) {
    if (!groupName || !message) {
      this.logger.error(`Invalid data provided by client ${client.id}`);
      return;
    }

    this.server.to(groupName).emit('msgGroup', {
      clientId: userId,
      message: message,
      userImg: userImg,
      userId: userId,
      userName: userName,
    });

    this.logger.log(
      `Client ${client.id} sent message to group ${groupName}: ${message}`,
    );
  }
}
