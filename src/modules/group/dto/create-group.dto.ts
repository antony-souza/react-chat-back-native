import { IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  name: string;

  @IsString({ each: true })
  @IsOptional()
  users?: string[];
}
