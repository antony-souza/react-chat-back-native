import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendschatDto } from './create-friendschat.dto';

export class UpdateFriendschatDto extends PartialType(CreateFriendschatDto) {}
