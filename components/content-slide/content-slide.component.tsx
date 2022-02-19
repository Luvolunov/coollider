import React, { useEffect } from 'react';
import { Slide } from '../../shared/types/block.interface';

type ContentSlideProps = {
  slide: Slide;
};

export function ContentSlide({ slide }: ContentSlideProps) {
  useEffect(() => {
    Prism.highlightAll();
  });
  return <div dangerouslySetInnerHTML={{ __html: slide.content }} />;
}
