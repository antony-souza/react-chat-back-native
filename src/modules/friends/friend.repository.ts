import { InjectModel } from '@nestjs/mongoose';
import { Friend } from './entities/friend.entity';
import { Model } from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

export class FriendRepository {
  constructor(
    @InjectModel(Friend.name) private readonly friendModel: Model<Friend>,
    @InjectModel(User.name) private readonly userdModel: Model<User>,
  ) {}

  async findInfoUserAndFriend(userId: string, friendId: string) {
    const [user, friend] = await Promise.all([
      this.userdModel.findById(userId),
      this.userdModel.findById(friendId),
    ]);

    if (!user || !friend) {
      throw new NotFoundException('Usuário ou amigo não encontrado!');
    }

    return { user, friend };
  }

  async sendFriendRequest(friend: Friend): Promise<Friend> {
    const existSoliciation = await this.friendModel
      .findOne({
        requesterUserId: friend.requesterUserId,
        friendId: friend.friendId,
        enabled: true,
      })
      .select('-createdAt -updatedAt -enabled');

    if (existSoliciation) {
      throw new ConflictException('Solicitação de amizade já enviada!');
    }

    return await this.friendModel.create(friend);
  }

  /* Passa o id do usuário logado no campo friendId e 
  retorna as solicitações de amizade que tem para ele */
  async listAllFriendRequest(userId: string): Promise<Friend[]> {
    return this.friendModel.aggregate([
      {
        $match: {
          friendId: userId,
          isAccepted: false,
          enabled: true,
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          requesterUserId: '$requesterUserId',
          requesterUserName: '$requesterUserName',
          requesterUserImg: '$requesterUserImg',
          isAccepted: '$isAccepted',
        },
      },
    ]);
  }

  async findOneFriendRequest(friendId: string): Promise<Friend> {
    const friend = await this.friendModel
      .findOne({
        friendId: friendId,
        isAccepted: false,
        enabled: true,
      })
      .select('-createdAt -updatedAt -enabled');

    if (!friend) {
      throw new NotFoundException('Nenhuma solicitação de amizade encontrada!');
    }

    return friend;
  }

  async acceptFriendRequest(id: string, friendId: string): Promise<Friend> {
    const acceptedFrint = await this.friendModel
      .findOneAndUpdate(
        { _id: id, friendId: friendId, isAccepted: false },
        {
          isAccepted: true,
          updatedAt: new Date(),
        },
        { new: true },
      )
      .select('-createdAt -updatedAt -enabled');

    if (!acceptedFrint) {
      throw new ConflictException('Falha ao aceitar solicitação de amizade!');
    }
    return acceptedFrint;
  }

  async rejectFriendRequest(id: string, friendId: string): Promise<void> {
    const rejectedFriend = await this.friendModel.updateOne(
      { _id: id, friendId: friendId, isAccepted: false },
      { enabled: false },
    );

    if (!rejectedFriend) {
      throw new ConflictException('Falha ao rejeitar solicitação de amizade!');
    }
  }

  async removeFriend(id: string): Promise<void> {
    const removedFriend = await this.friendModel.updateOne(
      {
        _id: id,
        isAccepted: true,
      },
      { enabled: false },
    );

    if (removedFriend.modifiedCount === 0) {
      throw new ConflictException('Falha ao remover amigo!');
    }
  }

  async searchFriendByName(name: string): Promise<User[]> {
    return this.userdModel.aggregate([
      {
        $match: {
          name: { $regex: name, $options: 'i' },
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: '$name',
          email: '$email',
          imgUrl: '$imgUrl',
        },
      },
    ]);
  }

  async listAllFriends(userId: string): Promise<Friend[]> {
    return this.friendModel.aggregate([
      {
        $match: {
          friendId: userId,
          isAccepted: true,
          enabled: true,
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          requesterUserId: '$requesterUserId',
          requesterUserName: '$requesterUserName',
          requesterUserImg: '$requesterUserImg',
          isAccepted: '$isAccepted',
        },
      },
    ]);
  }
}
