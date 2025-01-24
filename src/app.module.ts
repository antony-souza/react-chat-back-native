import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './modules/chat/chat.module';
import { UsersModule } from './modules/users/users.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { GroupModule } from './modules/group/group.module';
import { WebsocketModule } from './websocket/websocket.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    ChatModule,
    UsersModule,
    GroupModule,
    WebsocketModule,
    AuthModule,
  ],
  controllers: [],
  providers: [WebsocketGateway],
})
export class AppModule {}
