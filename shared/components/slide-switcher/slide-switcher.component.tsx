import React from 'react';
import dynamic from 'next/dynamic';
import { Slide } from '../../types/block.interface';
import styles from '../../../pages/lesson/lesson.module.scss';
import { SlideType } from '../../types/slide-type.enum';
import 'react-quill/dist/quill.bubble.css';

type SlideSwitcherProps = {
  slide: Slide;
};

const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
      [{ color: [] }],
    ],
  },
};

const ReactQuillWithNoSSR = dynamic(() => import('react-quill'), {
  ssr: false,
});

export default function SlideSwitcher({ slide }: SlideSwitcherProps) {
  switch (slide.type) {
    case SlideType.Text: {
      return (
        <ReactQuillWithNoSSR
          className={styles.editor}
          theme="bubble"
          modules={quillModules}
          value={slide.content}
          readOnly
        />
      );
    }
    case SlideType.Test: {
      return (
        <div>
          <h4>{slide.content.question}</h4>
        </div>
      )
    }
    default: {
      return null;
    }
  }
}
