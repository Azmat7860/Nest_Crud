/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CourseService } from './course.service';
import { Course } from 'src/dto/course.dto';

@Controller('course')
export class CourseController {

    constructor(private readonly CourseService: CourseService) { }

    @Post()

    async create(@Body() createCourse: Course) {
        await this.CourseService.create(createCourse);
    }

    @Get('/:id')
    async getOne(@Param('id') courseId: string) {
        return await this.CourseService.getCourseById(courseId);
    }

    @Get()
    async findAll(): Promise<Course[]> {
        return await this.CourseService.findAll();
    }

    @Patch('/:id')
    async update(@Body() updateCourse: Course,
        @Param('id') id) {
        const course = await this.CourseService.getCourseById(id);
        if (course) {
            return await this.CourseService.update(updateCourse, id);
        }
        throw new HttpException('Course Not Found', HttpStatus.FORBIDDEN);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
       return await this.CourseService.delete(id);
    }
}
