import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Counter extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  sequence_value: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
