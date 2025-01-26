import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { WebsocketModule } from 'src/websocket/websocket.module';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    WebsocketModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UploadFileFactoryService],
})
export class UsersModule {}
