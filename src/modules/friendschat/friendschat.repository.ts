import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friendschat } from './entities/friendschat.entity';
import { Model } from 'mongoose';

@Injectable()
export class FriendsChatRepository {
  @InjectModel(Friendschat.name)
  private readonly friendschatModel: Model<Friendschat>;

  async findFriendChat(userId: string): Promise<Friendschat[]> {
    return this.friendschatModel.aggregate([
      {
        $match: {
          enabled: true,
          $or: [{ userIdOne: userId }, { userIdTwo: userId }],
        },
      },
      {
        $addFields: {
          user: {
            $cond: {
              if: { $eq: ['$userIdOne', userId] },
              then: {
                _id: '$userIdTwo',
                name: '$userNameTwo',
                img: '$userImgTwo',
              },
              else: {
                _id: '$userIdOne',
                name: '$userNameOne',
                img: '$userImgOne',
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          userId: '$user._id',
          name: '$user.name',
          img: '$user.img',
        },
      },
    ]);
  }
}
