import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFriendDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  requesterUserId: string;

  @IsString()
  @IsOptional()
  requesterUserImg?: string;

  @IsString()
  @IsOptional()
  requesterUserName?: string;

  @IsString()
  friendId: string;

  @IsString()
  @IsOptional()
  friendName?: string;

  @IsString()
  @IsOptional()
  friendImg?: string;

  @IsBoolean()
  @IsOptional()
  isAccepted?: boolean;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;
}
