import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FriendRepository } from './friend.repository';

@Injectable()
export class FriendsService {
  constructor(private readonly friendRepository: FriendRepository) {}

  async sendFriendRequest(createFriendDto: CreateFriendDto) {
    const { user, friend } = await this.friendRepository.findInfoUserAndFriend(
      createFriendDto.userId,
      createFriendDto.friendId,
    );

    const sendRequest = await this.friendRepository.sendFriendRequest({
      ...createFriendDto,
      userImg: user.imgUrl,
      userName: user.name,
      friendName: friend.name,
    });

    if (!sendRequest) {
      throw new ConflictException('Falha ao enviar solicitação de amizade!');
    }

    return sendRequest;
  }

  async listAllFriendRequest(userId: string) {
    const list = await this.friendRepository.listAllFriendRequest(userId);

    if (!list) {
      throw new NotFoundException('Nenhuma solicitação de amizade encontrada!');
    }

    return list;
  }
}
