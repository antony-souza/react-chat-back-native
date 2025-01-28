import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true, versionKey: false })
export class Message {
  @Prop({ type: String, required: false, default: randomUUID })
  _id?: string;

  @Prop({ type: String, required: true, ref: 'Chat' })
  chatId: string;

  @Prop({ type: String, required: false })
  chatName?: string;

  @Prop({ type: String, required: true, ref: 'User' })
  userId: string;

  @Prop({ type: String, required: false })
  userName?: string;

  @Prop({ type: String, required: false })
  userImgUrl?: string;

  @Prop({ type: String, required: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
