import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(data: User): Promise<User> {
    return await this.userModel.create(data);
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).select('+password');
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .select('-password -createdAt -updatedAt -enabled');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
