import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { environmentDev } from './environment/environment.dev';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(environmentDev.mongoUrl),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
