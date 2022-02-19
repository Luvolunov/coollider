import React from 'react';
import { Slide } from '../../shared/types/block.interface';

type ContentSlideProps = {
  slide: Slide;
};

export function ContentSlide({ slide }: ContentSlideProps) {
  return <div dangerouslySetInnerHTML={{ __html: slide.content }} />;
}
