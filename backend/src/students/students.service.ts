import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './students.schema';
import { CreateStudentDto, UpdateStudentDto } from './students.dto';
import { CountersService } from 'src/counters/counters.service';
import { Class } from 'src/class/class.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Class.name) private classModel: Model<Class>,
    private countersService: CountersService,
  ) {}

  async create(data: CreateStudentDto): Promise<Student> {
    console.log(data);
    const sequenceValue =
      await this.countersService.getNextSequenceValue('studentCounter');
    const paddedId = sequenceValue.toString().padStart(6, '0');

    if (!paddedId) {
      throw new Error('The student id could not be generated');
    }

    let validatedClassIds = [];
    if (data.classIds && data.classIds.length > 0) {
      const existingClasses = await this.classModel
        .find({ _id: { $in: data.classIds } })
        .exec();
      if (existingClasses.length !== data.classIds.length) {
        throw new NotFoundException(
          'One or more class IDs provided do not exist',
        );
      }
      validatedClassIds = data.classIds;
    }

    const { ...rest } = data;
    const student = new this.studentModel({
      ...rest,
      id: paddedId,
      classIds: validatedClassIds,
    });
    return student.save();
  }

  async findAll(): Promise<Student[]> {
    const students = await this.studentModel.find().populate('classIds').exec();

    return students;
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel
      .findById(id)
      .populate('classIds')
      .exec();
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  async update(id: string, changes: UpdateStudentDto): Promise<Student> {
    const student = await this.studentModel
      .findByIdAndUpdate(id, changes, { new: true })
      .populate('classIds')
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
