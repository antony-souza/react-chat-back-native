import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFriendDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  userImg?: string;

  @IsString()
  friendId: string;

  @IsString()
  @IsOptional()
  friendName?: string;

  @IsBoolean()
  @IsOptional()
  isAccepted?: boolean;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;
}
