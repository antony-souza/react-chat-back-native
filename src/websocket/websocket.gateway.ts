import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

interface ISendMessage {
  groupId: string;
  message: string;
}

@WebSocketGateway()
export class WebsocketGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GatewaySocket');

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
  async handleLeaveGroup(client: Socket, groupId: string) {
    if (!groupId) {
      this.logger.error(`Invalid groupId provided by client ${client.id}`);
      return;
    }
    await client.leave(groupId);
    this.logger.log(`Client ${client.id} left store ${groupId}`);
  }

  @SubscribeMessage('sendMessage')
  sendMessageForGroup(client: Socket, { groupId, message }: ISendMessage) {
    if (!groupId || !message) {
      this.logger.error(`Invalid data provided by client ${client.id}`);
      return;
    }

    this.server.to(groupId).emit('msgGroup', { clientId: client.id, message });

    this.logger.log(
      `Client ${client.id} sent message to group ${groupId}: ${message}`,
    );
  }
}
