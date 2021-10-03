import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Slide } from '../../types/block.interface';
import { SlideType } from '../../types/slide-type.enum';
import 'react-quill/dist/quill.bubble.css';
import styles from './slide-switcher.module.scss';
import classnames from 'classnames';

type SlideSwitcherProps = {
  slide: Slide;
  onAnswer: (correct?: boolean) => void
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
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const answerHandler = (id: number) => {
    setCorrect(slide.content.correctVariantId === id);
    setAnswered(true);
  };
  const gradeClasses = classnames(styles.grade, {
    [styles.show]: answered,
    [styles.correct]: correct,
  });
  const variantsClasses = classnames(styles.variants, {
    [styles.hide]: answered,
  });
  useEffect(() => {
    if (!answered) { return; }
    onAnswer();
  }, [answered]);
  useEffect(() => {
    setAnswered(false);
    setCorrect(false);
  }, [slide]);
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
          <div className={gradeClasses}>
            {
              correct ? 'Верно' : 'Неверно'
            }
          </div>
          <div className={variantsClasses}>
            {
              slide.content.variants.map((variant: { id: number, text: string }) => (
                <React.Fragment key={variant.id}>
                  <input
                    className={styles.radio}
                    onChange={() => answerHandler(variant.id)}
                    type="radio"
                    name="variant"
                    id={`variant-${variant.id}`}
                  />
                  <label htmlFor={`variant-${variant.id}`} className={styles.variant}>
                    {variant.text}
                  </label>
                </React.Fragment>
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
