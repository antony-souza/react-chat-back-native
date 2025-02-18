import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Group } from './entities/group.entity';

export class GroupRepository {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(chat: Group): Promise<Group> {
    const user = await this.userModel.findById(chat.users);

    if (!user) {
      throw new NotFoundException('User not found - create chat');
    }

    return await this.groupModel.create({
      ...chat,
      usersName: user?.name,
      usersImgs: user?.imgUrl,
    });
  }

  async findById(id: string): Promise<Group> {
    const chat = await this.groupModel.findById(id);

    if (!chat) {
      throw new Error('Chat not found - RP');
    }

    return chat;
  }

  async findAll(): Promise<Group[]> {
    return await this.groupModel.aggregate([
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

  async findGroupsByUser(users: string[]): Promise<Group[]> {
    const chats: Group[] = await this.groupModel.aggregate([
      {
        $match: {
          users: { $all: [users] },
          private: false,
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
    const userExist = await this.groupModel.exists({
      _id: chatId,
      users: { $in: users },
    });

    if (userExist) {
      throw new ConflictException('User already in chat');
    }

    const addUserToChat = await this.groupModel.findByIdAndUpdate(
      { _id: chatId },
      { $push: { users: users } },
      { new: true },
    );

    return addUserToChat;
  }

  async getInfomationChatAndMembers(chatId: string): Promise<Group[]> {
    const chat: Group[] = await this.groupModel.aggregate([
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
    const chat = (await this.groupModel.findById(chatId)) as Group;

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    if (!chat.admins?.includes(adminId)) {
      throw new ConflictException('User is not admin');
    }

    if (!chat.users?.includes(userId)) {
      throw new NotFoundException('User not found in chat');
    }

    if (adminId === userId) {
      throw new ConflictException('Admin cannot remove himself');
    }

    const removeUser = await this.groupModel.updateOne(
      { _id: chatId },
      { $pull: { users: userId } },
    );

    if (!removeUser) {
      throw new ConflictException('Failed to remove user');
    }

    return removeUser;
  }

  async deleteGroup(groupId: string, userId: string) {
    const checkUserAdmin = await this.groupModel.exists({
      _id: groupId,
      admins: { $in: userId },
    });

    if (!checkUserAdmin) {
      throw new ConflictException('User is not admin - delete group');
    }

    const deleteGroup = await this.groupModel.updateOne(
      { _id: groupId },
      { $set: { enabled: false } },
    );

    console.log(deleteGroup);
    return deleteGroup;
  }
}
