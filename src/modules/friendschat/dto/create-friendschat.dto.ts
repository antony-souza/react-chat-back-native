import { IsOptional, IsString } from 'class-validator';

export class CreateFriendschatDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  userIdOne: string;

  @IsString()
  userNameOne: string;

  @IsString()
  userImgOne: string;

  @IsString()
  userIdTwo: string;

  @IsString()
  userNameTwo: string;

  @IsString()
  userImgTwo: string;
}
