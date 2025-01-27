import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';

@Injectable()
export class CodeService {
  create(createCodeDto: CreateCodeDto) {
    return 'This action adds a new recovery';
  }

  findAll() {
    return `This action returns all recovery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recovery`;
  }

  update(id: number, updateCodeDto: UpdateCodeDto) {
    return `This action updates a #${id} recovery`;
  }

  remove(id: number) {
    return `This action removes a #${id} recovery`;
  }
}
