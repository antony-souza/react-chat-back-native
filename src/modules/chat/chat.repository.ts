import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './entities/chat.entity';
import { Model } from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

export class ChatRepository {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(chat: Chat): Promise<Chat> {
    return await this.chatModel.create(chat);
  }

  async findById(id: string): Promise<Chat> {
    const chat = await this.chatModel.findById(id);

    if (!chat) {
      throw new Error('Chat not found - RP');
    }

    return chat;
  }

  async findAll(): Promise<Chat[]> {
    return await this.chatModel.aggregate([
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: '$name',
          imgUrl: '$imgUrl',
        },
      },
    ]);
  }

  async findGroupsByUser(users: string[]): Promise<Chat[]> {
    const chats: Chat[] = await this.chatModel.aggregate([
      {
        $match: {
          users: { $all: [users] },
          private: false,
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: '$name',
          imgUrl: '$imgUrl',
        },
      },
    ]);

    if (!chats) {
      throw new NotFoundException('Chats not found');
    }

    return chats;
  }

  async findChatByUser(users: string[]): Promise<Chat[]> {
    const chats: Chat[] = await this.chatModel.aggregate([
      {
        $match: {
          users: { $all: [users] },
          private: true,
          enabled: true,
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: '$name',
          imgUrl: '$imgUrl',
        },
      },
    ]);

    if (!chats) {
      throw new NotFoundException('Chats not found');
    }

    return chats;
  }

  async joinChat(chatId: string, users: string[]) {
    const userExist = await this.chatModel.exists({
      _id: chatId,
      users: { $in: users },
    });

    if (userExist) {
      throw new ConflictException('User already in chat');
    }

    const addUserToChat = await this.chatModel.findByIdAndUpdate(
      { _id: chatId },
      { $push: { users: users } },
      { new: true },
    );

    return addUserToChat;
  }
}
