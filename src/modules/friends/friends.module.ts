import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './entities/friend.entity';
import { FriendRepository } from './friend.repository';
import { User, UserSchema } from '../users/entities/user.entity';
import { Group, GroupSchema } from '../group/entities/group.entity';
import {
  Friendschat,
  FriendsChatSchema,
} from '../friendschat/entities/friendschat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([
      { name: Friendschat.name, schema: FriendsChatSchema },
    ]),
  ],
  controllers: [FriendsController],
  providers: [FriendsService, FriendRepository],
})
export class FriendsModule {}
