import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('/send-friend-request')
  @UseInterceptors(FileInterceptor(''))
  create(@Body() createFriendDto: CreateFriendDto) {
    return this.friendsService.sendFriendRequest(createFriendDto);
  }

  @Get('/list-all-friend-request/:userId')
  listAllFriendRequest(@Param('userId') userId: string) {
    return this.friendsService.listAllFriendRequest(userId);
  }

  @Put('/accept-friend-request/:friendId')
  acceptFriendRequest(@Param('friendId') friendId: string) {
    return this.friendsService.acceptFriendRequest(friendId);
  }

  @Get('/list-all-friends/:userId')
  listAllFriends(@Param('userId') userId: string) {
    return this.friendsService.listAllFriends(userId);
  }
}
