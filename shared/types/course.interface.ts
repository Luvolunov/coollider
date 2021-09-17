import { Lesson } from './lesson.interface';

export interface CourseInterface {
  id: number;
  name: string;
  description: string;
  authorId: number;
  authorName: string;
  imageUrl: string;
  lessonsCount?: number;
  completedLessons?: number;
  lessons?: Array<Lesson>;
}
