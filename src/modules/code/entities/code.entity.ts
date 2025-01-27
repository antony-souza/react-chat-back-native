import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true, versionKey: false })
export class Code {
  @Prop({ type: String, default: randomUUID, required: false })
  _id?: string;

  @Prop({ type: String, required: true })
  recoveryCode: string;

  @Prop({ type: Date, required: true })
  codeExpires: Date;

  @Prop({ type: String, required: false })
  userId?: string;

  @Prop({ type: Boolean, default: true, required: false })
  enabled?: boolean;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
