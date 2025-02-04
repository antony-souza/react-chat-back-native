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
      createFriendDto.requesterUserId,
      createFriendDto.friendId,
    );

    const sendRequest = await this.friendRepository.sendFriendRequest({
      ...createFriendDto,
      requesterUserImg: user.imgUrl,
      requesterUserName: user.name,
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

  async acceptFriendRequest(id: string, friendId: string) {
    const existSoliciation =
      await this.friendRepository.findOneFriendRequest(friendId);

    if (!existSoliciation) {
      throw new NotFoundException('Solicitação de amizade não encontrada!');
    }

    const friend = await this.friendRepository.acceptFriendRequest(
      id,
      friendId,
    );

    if (!friend) {
      throw new NotFoundException('Aceitação de amizade falhou!');
    }

    return {
      message: `${friend.friendName} aceitou a solicitação de amizade!`,
      friend,
    };
  }

  async rejectFriendRequest(friendId: string) {
    const existSoliciation =
      await this.friendRepository.findOneFriendRequest(friendId);

    if (!existSoliciation) {
      throw new NotFoundException('Solicitação de amizade não encontrada!');
    }

    const friend = await this.friendRepository.rejectFriendRequest(friendId);

    if (!friend) {
      throw new NotFoundException('Rejeição de amizade falhou!');
    }

    return {
      message: `${friend.friendName} rejeitou a solicitação de amizade!`,
      friend,
    };
  }

  async listAllFriends(userId: string) {
    const list = await this.friendRepository.listAllFriends(userId);

    if (!list) {
      throw new NotFoundException('Nenhum amigo encontrado!');
    }

    return list;
  }
}
