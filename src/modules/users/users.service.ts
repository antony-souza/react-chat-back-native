import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { createHash } from 'src/utils/hash-pass';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const checkUser = await this.userRepository.findOneByEmail(
      createUserDto.email,
    );

    if (checkUser) {
      throw new ConflictException('User already exists!');
    }

    const password = await createHash(createUserDto.password);

    const createUser = await this.userRepository.create({
      ...createUserDto,
      password: password,
    });

    if (!createUser) {
      throw new ConflictException('Failure creating user!');
    }

    return createUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
