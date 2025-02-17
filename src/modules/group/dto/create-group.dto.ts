import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  imgUrl?: Express.Multer.File;

  @IsString()
  name: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  private?: boolean;

  @IsString({ each: true })
  @IsOptional()
  users?: string[];

  /*   @IsString({ each: true })
  @IsOptional()
  usersName?: string[];

  @IsString({ each: true })
  @IsOptional()
  usersImgs?: string[]; */

  @IsString({ each: true })
  @IsOptional()
  admins?: string[];

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  enabled?: boolean;
}
