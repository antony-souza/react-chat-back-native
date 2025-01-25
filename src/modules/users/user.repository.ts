import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

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

  async findOneById(id: string) {
    return await this.userModel.findById(id);
  }
}
