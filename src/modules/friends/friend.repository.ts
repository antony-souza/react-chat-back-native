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
    const existSoliciation = await this.friendModel.findOne({
      userId: friend.userId,
      friendId: friend.friendId,
      enabled: true,
    });

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
          userId: '$userId',
          userName: '$userName',
          userImg: '$userImg',
          isAccepted: '$isAccepted',
        },
      },
    ]);
  }

  async acceptFriendRequest(friendId: string): Promise<Friend> {
    const acceptedFrint = await this.friendModel.findByIdAndUpdate(friendId, {
      isAccepted: true,
    });

    if (!acceptedFrint) {
      throw new ConflictException('Falha ao aceitar solicitação de amizade!');
    }
    return acceptedFrint;
  }
}
