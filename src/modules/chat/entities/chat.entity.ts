import { Prop, Schema } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true, versionKey: false })
export class Chat {
  @Prop({ type: String, required: false, default: randomUUID })
  _id?: string;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: String, required: true })
  group: string;

  @Prop({ type: String, required: true })
  user: string;
}
