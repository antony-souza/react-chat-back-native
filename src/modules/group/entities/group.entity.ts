import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true, versionKey: false })
export class Group {
  @Prop({ type: String, default: randomUUID, required: false })
  _id?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String], required: false, ref: 'User' })
  users?: string[];

  @Prop({ type: Boolean, required: false, default: true })
  enabled?: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
