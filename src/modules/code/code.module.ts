import { Module } from '@nestjs/common';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Code, CodeSchema } from './entities/code.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Code.name, schema: CodeSchema }]),
  ],
  controllers: [CodeController],
  providers: [CodeService],
})
export class RecoveryModule {}
