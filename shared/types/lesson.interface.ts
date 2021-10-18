import { Slide } from './block.interface';

export interface Lesson {
  id: number;
  name: string;
  courseId: number;
  courseImage: string;
  blocks: Array<Slide>,
  completed?: boolean;
  available?: boolean;
  order: number;
}
