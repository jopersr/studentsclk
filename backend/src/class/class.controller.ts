import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto } from './class.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('classes')
@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new class' })
  @ApiResponse({ status: 201, description: 'Class created successfully.' })
  @ApiBody({ type: CreateClassDto })
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get the list of all classes' })
  @ApiResponse({ status: 200, description: 'List of classes.' })
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a class by ID' })
  @ApiResponse({ status: 200, description: 'Returns the requested class.' })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a class by ID' })
  @ApiResponse({ status: 200, description: 'Class updated successfully.' })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  @ApiBody({ type: UpdateClassDto })
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(id, updateClassDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a class by ID' })
  @ApiResponse({ status: 204, description: 'Class deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
