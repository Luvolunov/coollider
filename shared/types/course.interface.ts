export interface CourseInterface {
  id: number;
  name: string;
  authorId: number;
  authorName: string;
  imageUrl: string;
  lessonsCount?: number;
  lessons?: Array<{ id: number, name: number, courseId: number }>;
}
