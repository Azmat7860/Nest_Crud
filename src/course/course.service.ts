/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './../dto/course.dto';

@Injectable()
export class CourseService {
    constructor(@InjectModel('Course') private readonly CourseModel: Model<Course>
    ) { }

    async create(createCourse: Course): Promise<Course> {
        try {
            const course = new this.CourseModel({
                title: createCourse.title,
                description: createCourse.description,
                duration: createCourse.duration,
                instructor: createCourse.instructor,
            })
            return await course.save();
        } catch (error) {
            throw new HttpException('Error creating Course', HttpStatus.BAD_REQUEST);
        }
    }

    async getCourseById(id: string): Promise<Course> {
        try {
            const course = await this.findCourse(id);
            if (!course) {
                throw new NotFoundException('Could not find article.');
            }
            return course;
        } catch (error) {
            throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
        }
    }

    async findAll(): Promise<Course[]> {
        return await this.CourseModel.find();
    }

    async findCourse(id: string): Promise<Course> {
        let course: any;
        try {
            course = await this.CourseModel.findById(id).exec();
            return course || null;
        } catch (error) {
            return null;
        }
    }

    async update(updateCourse: Course, id: string): Promise<Course> {
        try {
            const course = await this.findCourse(id);
            course.title = updateCourse.title;
            course.description = updateCourse.description;
            course.duration = updateCourse.duration;
            course.instructor = updateCourse.instructor;
            return course.save();
        } catch (error) {
            throw new HttpException('Error updating course', HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return this.CourseModel.deleteOne({ "_id": id });
        } catch (error) {
            throw new HttpException('Error deleting Course', HttpStatus.BAD_REQUEST);
        }
    }
}
