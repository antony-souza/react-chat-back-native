import { InjectModel } from '@nestjs/mongoose';
import { Code } from './entities/code.entity';
import { Model } from 'mongoose';

export class CodeRepository {
  constructor(
    @InjectModel(Code.name) private readonly codeModel: Model<Code>,
  ) {}

  async create(data: Code): Promise<Code> {
    return await this.codeModel.create(data);
  }
}
