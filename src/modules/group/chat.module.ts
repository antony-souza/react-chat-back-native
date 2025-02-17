import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './entities/group.entity';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';
import { User, UserSchema } from '../users/entities/user.entity';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupRepository } from './group.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, UploadFileFactoryService],
})
export class GroupModule {}
