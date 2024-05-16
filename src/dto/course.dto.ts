/* eslint-disable prettier/prettier */

import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  save(): Course | PromiseLike<Course> {
      throw new Error('Method not implemented.');
  }

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  duration: string;

  @Prop()
  instructor: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
