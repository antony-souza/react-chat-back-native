import { Module } from '@nestjs/common';
import { FriendschatService } from './friendschat.service';
import { FriendschatController } from './friendschat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friendschat, FriendsChatSchema } from './entities/friendschat.entity';
import { FriendsChatRepository } from './friendschat.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Friendschat.name, schema: FriendsChatSchema },
    ]),
  ],
  controllers: [FriendschatController],
  providers: [FriendschatService, FriendsChatRepository],
})
export class FriendschatModule {}
