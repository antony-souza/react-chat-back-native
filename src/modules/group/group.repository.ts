import { InjectModel } from '@nestjs/mongoose';
import { Group } from './entities/group.entity';
import { Model } from 'mongoose';

export class GroupRepository {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  async create(data: Group): Promise<Group> {
    return await this.groupModel.create(data);
  }

  async findOneById(id: string) {
    return await this.groupModel.findById(id).exec();
  }

  async findByName(name: string) {
    return await this.groupModel.findOne({ name: name }).exec();
  }
}
