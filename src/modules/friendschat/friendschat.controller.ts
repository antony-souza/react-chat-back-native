import { Controller, Get, Param } from '@nestjs/common';
import { FriendschatService } from './friendschat.service';

@Controller('/friendschat')
export class FriendschatController {
  constructor(private readonly friendschatService: FriendschatService) {}

  @Get('/find/:userId')
  async findFriendChat(@Param('userId') userId: string) {
    return this.friendschatService.findFriendChat(userId);
  }
}
