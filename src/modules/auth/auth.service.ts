import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authLogin(dto: CreateAuthDto) {
    const checkUser = await this.userRepository.findOneByEmail(dto.email);
    if (!checkUser) {
      throw new NotFoundException('User not found!');
    }

    if (
      !checkUser.password ||
      !(await bcrypt.compare(dto.password, checkUser.password))
    ) {
      throw new ConflictException('Password is incorrect');
    }

    return {
      id: checkUser._id,
      statusCode: 200,
    };
  }
}
