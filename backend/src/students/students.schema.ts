import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Class } from '../class/class.schema';

@Schema()
export class Student extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  id: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Class.name }],
    required: false,
  })
  classIds?: (Class | string)[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
