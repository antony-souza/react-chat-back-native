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
    const user = await this.userModel.findById(chat.users);

    if (!user) {
      throw new NotFoundException('User not found - create chat');
    }

    return await this.chatModel.create({
      ...chat,
      usersName: user?.name,
      usersImgs: user?.imgUrl,
    });
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

  async findPrivateFriendChat(users: string[]): Promise<Chat[]> {
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

  async getInfomationChatAndMembers(chatId: string): Promise<Chat[]> {
    const chat: Chat[] = await this.chatModel.aggregate([
      {
        $match: {
          _id: chatId,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'usersData',
        },
      },
      {
        $unwind: {
          path: '$usersData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          chatId: '$_id',
          chatName: '$name',
          chatImgUrl: '$imgUrl',
          userId: '$usersData._id',
          userName: '$usersData.name',
          userImgUrl: '$usersData.imgUrl',
          userEmail: '$usersData.email',
        },
      },
    ]);

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat;
  }

  async removeUserFromChat(chatId: string, userId: string, adminId: string) {
    const userExist = await this.chatModel.exists({
      _id: chatId,
      admins: { $in: adminId },
      users: { $in: userId },
    });

    if (!userExist) {
      throw new NotFoundException('User not found in chat');
    }

    const removeUser = await this.chatModel.findByIdAndUpdate(
      { _id: chatId },
      { $pull: { users: userId } },
      { new: true },
    );

    return removeUser;
  }
}
