import { IsString, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: 'Physics 101' })
  @IsString()
  className: string;

  @ApiProperty({
    example: 23,
    description: 'Year must be a number up to two digits',
  })
  @IsNumber()
  @Min(0)
  @Max(99)
  year: number;
}

export class UpdateClassDto {
  @ApiProperty({ example: 'Physics 101', required: false })
  @IsString()
  className?: string;

  @ApiProperty({ example: 23, required: false })
  @IsNumber()
  @Min(0)
  @Max(99)
  year?: number;
}
