import { Model } from 'mongoose';
import { Message } from './entities/message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from '../chat/entities/chat.entity';
import { NotFoundException } from '@nestjs/common';

export class MessageRepository {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {}

  async countUserByChatIdAndUserId(
    chatId: string,
    userId: string,
  ): Promise<number> {
    return await this.chatModel.countDocuments({ _id: chatId, users: userId });
  }

  async create(message: Message): Promise<Message> {
    return await this.messageModel.create(message);
  }

  async findByChatId(chatId: string): Promise<Message[]> {
    const messages = await this.messageModel.find({ chatId: chatId });

    if (!messages) {
      throw new NotFoundException('Messages not found');
    }

    return messages;
  }
}
