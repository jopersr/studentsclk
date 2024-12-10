import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './class.schema';
import { CreateClassDto, UpdateClassDto } from './class.dto';

@Injectable()
export class ClassService {
  constructor(@InjectModel(Class.name) private classModel: Model<Class>) {}

  async create(data: CreateClassDto): Promise<Class> {
    const newClass = new this.classModel(data);
    return newClass.save();
  }

  async findAll(): Promise<Class[]> {
    return this.classModel.find().exec();
  }

  async findOne(id: string): Promise<Class> {
    const found = await this.classModel.findById(id).exec();
    if (!found) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    return found;
  }

  async update(id: string, changes: UpdateClassDto): Promise<Class> {
    const updated = await this.classModel
      .findByIdAndUpdate(id, changes, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.classModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
  }
}
