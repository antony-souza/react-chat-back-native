import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateChatDto {
  @IsUUID()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  imgUrl?: Express.Multer.File;

  @IsString()
  name: string;

  @IsString({ each: true })
  users: string[];

  @IsString({ each: true })
  @IsOptional()
  admins?: string[];
}
