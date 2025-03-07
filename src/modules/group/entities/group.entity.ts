import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true, versionKey: false })
export class Group {
  @Prop({ type: String, required: false, default: randomUUID })
  _id?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: String,
    required: false,
    default: 'https://i.imgur.com/MKF1AV6.png',
  })
  imgUrl?: string;

  @Prop({ type: Boolean, required: false, default: false })
  private?: boolean;

  @Prop({ type: Boolean, required: false, default: true })
  enabled?: boolean;

  @Prop({ type: [String], required: false })
  users?: string[];

  @Prop({ type: [String], required: false })
  admins?: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
