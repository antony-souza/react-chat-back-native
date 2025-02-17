import { Injectable } from '@nestjs/common';
import { CreateFriendschatDto } from './dto/create-friendschat.dto';
import { UpdateFriendschatDto } from './dto/update-friendschat.dto';

@Injectable()
export class FriendschatService {
  create(createFriendschatDto: CreateFriendschatDto) {
    return 'This action adds a new friendschat';
  }

  findAll() {
    return `This action returns all friendschat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friendschat`;
  }

  update(id: number, updateFriendschatDto: UpdateFriendschatDto) {
    return `This action updates a #${id} friendschat`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendschat`;
  }
}
