import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './entities/chat.entity';
import { Model } from 'mongoose';

export class ChatRepository {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {}

  async create(chat: Chat): Promise<Chat> {
    return this.chatModel.create(chat);
  }

  async findById(id: string) {
    return await this.chatModel.findById({ _id: id });
  }

  async findAll() {
    return await this.chatModel.find();
  }
}
