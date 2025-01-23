import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async create(createGroupDto: CreateGroupDto) {
    const checkGroup = await this.groupRepository.findByName(
      createGroupDto.name,
    );

    if (checkGroup) {
      throw new ConflictException('Group already exists!');
    }

    const createGroup = await this.groupRepository.create(createGroupDto);

    if (!createGroup) {
      throw new ConflictException('Group could not be created!');
    }

    return createGroup;
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
