import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Class extends Document {
  @Prop({ required: true })
  className: string;

  @Prop({ required: true, min: 1900 })
  year: number;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
