import { Block } from './block.interface';

export interface Lesson {
  id: number;
  name: string;
  courseId: number;
  courseImage: string;
  blocks: Array<Block>,
  completed?: boolean;
  order: number;
}
