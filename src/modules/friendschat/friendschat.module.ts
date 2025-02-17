import { Module } from '@nestjs/common';
import { FriendschatService } from './friendschat.service';
import { FriendschatController } from './friendschat.controller';

@Module({
  controllers: [FriendschatController],
  providers: [FriendschatService],
})
export class FriendschatModule {}
