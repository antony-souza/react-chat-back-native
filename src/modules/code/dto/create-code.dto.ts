import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCodeDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsOptional()
  codeExpires?: Date;

  @IsOptional()
  user?: string;

  @IsOptional()
  enabled?: boolean;
}
