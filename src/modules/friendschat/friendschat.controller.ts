import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendschatService } from './friendschat.service';
import { CreateFriendschatDto } from './dto/create-friendschat.dto';
import { UpdateFriendschatDto } from './dto/update-friendschat.dto';

@Controller('friendschat')
export class FriendschatController {
  constructor(private readonly friendschatService: FriendschatService) {}

  @Post()
  create(@Body() createFriendschatDto: CreateFriendschatDto) {
    return this.friendschatService.create(createFriendschatDto);
  }

  @Get()
  findAll() {
    return this.friendschatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendschatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendschatDto: UpdateFriendschatDto) {
    return this.friendschatService.update(+id, updateFriendschatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendschatService.remove(+id);
  }
}
