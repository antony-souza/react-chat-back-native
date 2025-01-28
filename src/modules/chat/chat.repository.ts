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

  async findById(id: string): Promise<Chat> {
    const chat = await this.chatModel.findById(id);

    if (!chat) {
      throw new Error('Chat not found - RP');
    }

    return chat;
  }

  async findAll(): Promise<Chat[]> {
    return await this.chatModel.aggregate([
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: '$name',
          imgUrl: '$imgUrl',
        },
      },
    ]);
  }
}
