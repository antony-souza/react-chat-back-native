import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';

@Controller('recovery')
export class CodeController {
  constructor(private readonly recoveryService: CodeService) {}

  @Post()
  create(@Body() createCodeDto: CreateCodeDto) {
    return this.recoveryService.create(createCodeDto);
  }

  @Get()
  findAll() {
    return this.recoveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recoveryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
    return this.recoveryService.update(+id, updateCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recoveryService.remove(+id);
  }
}
