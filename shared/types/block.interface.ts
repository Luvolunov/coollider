import { SlideType } from './slide-type.enum';

export interface Slide {
  order: number;
  content: any;
  type: SlideType;
}
