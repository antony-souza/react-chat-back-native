import { Model } from 'mongoose';
import { Message } from './entities/message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from '../chat/entities/chat.entity';
import { NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

export class MessageRepository {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {}

  async checkChatAndUser(chatId: string, userId: string) {
    const [chat, user] = await Promise.all([
      this.chatModel.findById(chatId),
      this.userModel.findById(userId),
    ]);

    if (!chat || !user) {
      throw new NotFoundException('Chat or user not found');
    }

    return { chat, user };
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
