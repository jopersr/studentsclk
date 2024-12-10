import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Class } from '../class/class.schema'; // Importamos el modelo Class para la referencia

@Schema()
export class Student extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true, min: 1, max: 999999 })
  studentNumber: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Class.name,
    required: false,
  })
  class?: Class | string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
