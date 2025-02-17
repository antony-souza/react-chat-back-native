import {
  ConflictException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatRepository } from './chat.repository';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly uploadImg: UploadFileFactoryService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    let imgUrl: string | undefined = '';

    if (createChatDto.imgUrl) {
      imgUrl = await this.uploadImg.upload(createChatDto.imgUrl);
    }

    const createChat = await this.chatRepository.create({
      ...createChatDto,
      imgUrl: imgUrl,
      users: createChatDto.users,
      admins: createChatDto.admins,
    });

    if (!createChat) {
      throw new NotImplementedException('Falha ao criar chat');
    }
    return createChat;
  }

  async findAll() {
    const chats = await this.chatRepository.findAll();

    if (!chats) {
      throw new NotFoundException('Falha ao buscar chats');
    }

    return chats;
  }

  async findOne(id: string) {
    const chat = await this.chatRepository.findById(id);

    if (!chat) {
      throw new NotFoundException('Chat não encontrado');
    }

    return chat;
  }

  async findGroupsByUser(users: string[]) {
    const chat = await this.chatRepository.findGroupsByUser(users);

    if (!chat) {
      throw new NotFoundException('Chats do usuário não encontrados');
    }

    return chat;
  }

  async findChatByUser(users: string[]) {
    const chat = await this.chatRepository.findChatByUser(users);

    if (!chat) {
      throw new NotFoundException('Chat privado não encontrado');
    }

    return chat;
  }

  async joinChat(chatId: string, users: string[]) {
    const chat = await this.chatRepository.joinChat(chatId, users);

    if (!chat) {
      throw new ConflictException('Falha ao adicionar usuário ao chat');
    }

    return chat;
  }

  async getInfoChatAndUser(chatId: string) {
    const chat = await this.chatRepository.getInfomationChatAndMembers(chatId);

    if (!chat) {
      throw new NotFoundException('Chat não encontrado');
    }

    return chat;
  }

  async removeUserFromChat(chatId: string, userId: string, adminId: string) {
    const chat = await this.chatRepository.removeUserFromChat(
      chatId,
      userId,
      adminId,
    );

    if (!chat) {
      throw new ConflictException('Falha ao remover usuário do chat');
    }

    return chat;
  }
}
