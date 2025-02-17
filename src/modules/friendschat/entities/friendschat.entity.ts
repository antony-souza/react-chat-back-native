import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true, versionKey: false })
export class Friendschat {
  @Prop({ type: String, required: false, default: randomUUID })
  _id?: string;

  @Prop({ type: String, required: true })
  userIdOne: string;

  @Prop({ type: String, required: true })
  userNameOne: string;

  @Prop({ type: String, required: true })
  userImgOne: string;

  @Prop({ type: String, required: true })
  userIdTwo: string;

  @Prop({ type: String, required: true })
  userNameTwo: string;

  @Prop({ type: String, required: true })
  userImgTwo: string;

  @Prop({ type: Boolean, default: true, required: false })
  enabled?: boolean;
}

export const FriendsChatSchema = SchemaFactory.createForClass(Friendschat);
