import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';
import { FriendsModule } from './modules/friends/friends.module';
import { FriendschatModule } from './modules/friendschat/friendschat.module';
import { GroupModule } from './modules/group/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    GroupModule,
    UsersModule,
    AuthModule,
    MessageModule,
    FriendsModule,
    FriendschatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
