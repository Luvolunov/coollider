import React from 'react';
import dynamic from 'next/dynamic';
import { Slide } from '../../types/block.interface';
import { SlideType } from '../../types/slide-type.enum';
import 'react-quill/dist/quill.bubble.css';
import styles from './slide-switcher.module.scss';

type SlideSwitcherProps = {
  slide: Slide;
  onAnswer: () => void
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

export default function SlideSwitcher({ slide, onAnswer }: SlideSwitcherProps) {
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
        <div className={styles.testSlideOuter}>
          <span className={styles.question}>{slide.content.question}</span>
          <div className={styles.variants}>
            {
              slide.content.variants.map((variant: { id: number, text: string }) => (
                <button type="button" onClick={onAnswer} className={styles.variant}>
                  {variant.text}
                </button>
              ))
            }
          </div>
        </div>
      );
    }
    default: {
      return null;
    }
  }
}
