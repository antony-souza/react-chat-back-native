import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
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
    });

    if (!createChat) {
      throw new NotImplementedException('Falha ao criar chat');
    }

    return createChat;
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
