import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Message {
  @Prop({ type: String, required: true })
  chatId: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
