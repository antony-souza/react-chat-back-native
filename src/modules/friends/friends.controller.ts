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

  @Get('/list-users-for-add/:name')
  listUsersForAdd(@Param('name') name: string) {
    return this.friendsService.listByName(name);
  }

  @Put('/accept-friend-request/:friendId/:id')
  acceptFriendRequest(
    @Param('friendId') friendId: string,
    @Param('id') id: string,
  ) {
    return this.friendsService.acceptFriendRequest(id, friendId);
  }

  @Put('/reject-friend-request/:friendId/:id')
  rejectFriendRequest(
    @Param('friendId') friendId: string,
    @Param('id') id: string,
  ) {
    return this.friendsService.rejectFriendRequest(id, friendId);
  }

  @Put('/remove-friend/:id')
  removeFriend(@Param('id') id: string) {
    return this.friendsService.removeFriend(id);
  }

  @Get('/list-all-friends/:userId')
  listAllFriends(@Param('userId') userId: string) {
    return this.friendsService.listAllFriends(userId);
  }
}
