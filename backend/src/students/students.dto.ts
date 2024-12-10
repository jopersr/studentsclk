import {
  IsString,
  IsEmail,
  IsNumber,
  Max,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 123456 })
  @IsNumber()
  @Min(1)
  @Max(999999)
  studentNumber: number;

  @ApiProperty({
    example: '60c72b2f5f1b2c001c8e4a2b',
    required: false,
    description: 'MongoDB ObjectId of the class',
  })
  @IsOptional()
  @IsString()
  class?: string;
}

export class UpdateStudentDto {
  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 123456, required: false })
  @IsOptional()
  @Min(1)
  @Max(999999)
  studentNumber?: number;

  @ApiProperty({ example: '60c72b2f5f1b2c001c8e4a2b', required: false })
  @IsOptional()
  @IsString()
  class?: string;
}
