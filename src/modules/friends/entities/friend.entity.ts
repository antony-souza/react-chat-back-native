import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true, versionKey: false })
export class Friend {
  @Prop({ type: String, required: false, default: randomUUID })
  _id?: string;

  @Prop({ type: String, required: true })
  requesterUserId: string;

  @Prop({ type: String, required: false })
  requesterUserName?: string;

  @Prop({ type: String, required: false })
  requesterUserImg?: string;

  @Prop({ type: String, required: true })
  friendId: string;

  @Prop({ type: String, required: false })
  friendName?: string;

  @Prop({ type: Boolean, required: true, default: false })
  isAccepted?: boolean;

  @Prop({ type: Boolean, required: true, default: true })
  enabled?: boolean;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
