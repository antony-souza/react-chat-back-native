import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { createHash } from 'src/utils/hash-pass';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';

export interface IResponseCreateUser {
  message: string;
  statusCode: number;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uploadFactoryService: UploadFileFactoryService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IResponseCreateUser> {
    const checkUser = await this.userRepository.findOneByEmail(
      createUserDto.email,
    );

    if (checkUser) {
      throw new ConflictException('User already exists!');
    }

    const password = await createHash(createUserDto.password);

    let imgUrl: string | undefined;
    if (createUserDto.imgUrl) {
      imgUrl = await this.uploadFactoryService.upload(createUserDto.imgUrl);
    }

    const createUser = await this.userRepository.create({
      ...createUserDto,
      password: password,
      imgUrl: imgUrl,
    });

    if (!createUser) {
      throw new ConflictException('Failure creating user!');
    }

    return {
      message: 'User created successfully!',
      statusCode: 201,
    };
  }

  findAll() {
    return this.userRepository.findAllUsers();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    let imgUrl: string | undefined;

    if (updateUserDto.imgUrl) {
      imgUrl = await this.uploadFactoryService.upload(updateUserDto.imgUrl);
    }
    return await this.userRepository.update({
      ...updateUserDto,
      imgUrl: imgUrl,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
