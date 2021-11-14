import React from 'react';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import highlight from 'highlight.js';
import { Slide } from '../../types/block.interface';
import { SlideType } from '../../types/slide-type.enum';
import 'react-quill/dist/quill.bubble.css';
import styles from './slide-switcher.module.scss';
import 'highlight.js/styles/monokai-sublime.css';

highlight.configure({
  languages: ['javascript', 'html', 'css'],
});

type SlideSwitcherProps = {
  slide: Slide;
  correct?: boolean,
  answered?: boolean,
  onChange: (value: number) => void
};

const quillModules = {
  syntax: {
    highlight: (text: string) => highlight.highlightAuto(text).value,
  },
};

const ReactQuillWithNoSSR = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <span>Загрузка...</span>,
});

export default function SlideSwitcher({
  slide, onChange, answered, correct,
}: SlideSwitcherProps) {
  const answerHandler = (id: number) => {
    if (!onChange) { return; }
    onChange(id);
  };
  const gradeClasses = classnames(styles.grade, {
    [styles.show]: answered,
    [styles.correct]: correct,
  });
  const variantsClasses = classnames(styles.variants, {
    [styles.hide]: answered,
  });
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
