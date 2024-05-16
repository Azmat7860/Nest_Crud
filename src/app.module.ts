import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/nestDB'),
    CourseModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
