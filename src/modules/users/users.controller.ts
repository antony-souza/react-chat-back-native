import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('imgUrl'))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() imgUrl: Express.Multer.File,
  ) {
    return this.usersService.create({
      ...createUserDto,
      imgUrl: imgUrl,
    });
  }

  @Get('/all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put('/update')
  @UseInterceptors(FileInterceptor('imgUrl'))
  update(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() imgUrl: Express.Multer.File,
  ) {
    console.log(updateUserDto);
    return this.usersService.update({
      ...updateUserDto,
      imgUrl: imgUrl,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
