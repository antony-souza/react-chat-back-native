import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async create(createMessageDto: CreateMessageDto) {
    const countChatAndUser =
      await this.messageRepository.countUserByChatIdAndUserId(
        createMessageDto.chatId,
        createMessageDto.userId,
      );

    if (!countChatAndUser || countChatAndUser === 0) {
      throw new NotFoundException('Chat or user not found');
    }

    const message = await this.messageRepository.create(createMessageDto);

    if (!message) {
      throw new Error('Message not created');
    }

    return message;
  }

  async findAllMessagesByChatId(id: string) {
    const messages = await this.messageRepository.findByChatId(id);

    if (!messages) {
      throw new NotFoundException('Messages not found');
    }

    return messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
