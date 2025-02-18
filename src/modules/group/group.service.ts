import {
  ConflictException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';
import { GroupRepository } from './group.repository';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly uploadImg: UploadFileFactoryService,
  ) {}

  async create(createChatDto: CreateGroupDto) {
    let imgUrl: string | undefined = '';

    if (createChatDto.imgUrl) {
      imgUrl = await this.uploadImg.upload(createChatDto.imgUrl);
    }

    const createChat = await this.groupRepository.create({
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
    const chats = await this.groupRepository.findAll();

    if (!chats) {
      throw new NotFoundException('Falha ao buscar chats');
    }

    return chats;
  }

  async findOne(id: string) {
    const chat = await this.groupRepository.findById(id);

    if (!chat) {
      throw new NotFoundException('Chat não encontrado');
    }

    return chat;
  }

  async findGroupsByUser(users: string[]) {
    const chat = await this.groupRepository.findGroupsByUser(users);

    if (!chat) {
      throw new NotFoundException('Chats do usuário não encontrados');
    }

    return chat;
  }

  async joinChat(chatId: string, users: string[]) {
    const chat = await this.groupRepository.joinChat(chatId, users);

    if (!chat) {
      throw new ConflictException('Falha ao adicionar usuário ao chat');
    }

    return chat;
  }

  async getInfoChatAndUser(chatId: string) {
    const chat = await this.groupRepository.getInfomationChatAndMembers(chatId);

    if (!chat) {
      throw new NotFoundException('Chat não encontrado');
    }

    return chat;
  }

  async removeUserFromChat(chatId: string, userId: string, adminId: string) {
    const chat = await this.groupRepository.removeUserFromChat(
      chatId,
      userId,
      adminId,
    );

    if (!chat) {
      throw new ConflictException('Falha ao remover usuário do chat');
    }

    return chat;
  }

  async deleteGroup(groupId: string, userId: string) {
    const chat = await this.groupRepository.deleteGroup(groupId, userId);

    if (!chat) {
      throw new ConflictException('Falha ao deletar chat');
    }

    return chat;
  }
}
