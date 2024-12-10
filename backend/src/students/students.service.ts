import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './students.schema';
import { CreateStudentDto, UpdateStudentDto } from './students.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(data: CreateStudentDto): Promise<Student> {
    const student = new this.studentModel(data);
    return student.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().populate('class').exec();
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel
      .findById(id)
      .populate('class')
      .exec();
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  async update(id: string, changes: UpdateStudentDto): Promise<Student> {
    const student = await this.studentModel
      .findByIdAndUpdate(id, changes, { new: true })
      .populate('class')
      .exec();

    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
  }
}
