import { Injectable } from '@nestjs/common';
import { FriendsChatRepository } from './friendschat.repository';

@Injectable()
export class FriendschatService {
  constructor(private readonly friendsChatRepository: FriendsChatRepository) {}

  async findFriendChat(userId: string) {
    return this.friendsChatRepository.findFriendChat(userId);
  }
}
