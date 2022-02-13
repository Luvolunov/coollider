import React, { useEffect } from 'react';
import classnames from 'classnames';
import { Slide } from '../../types/block.interface';
import { SlideType } from '../../types/slide-type.enum';
import 'react-quill/dist/quill.bubble.css';
import styles from './slide-switcher.module.scss';

type SlideSwitcherProps = {
  slide: Slide;
  correct?: boolean,
  answered?: boolean,
  onChange: (value: number) => void
};

type TextContentBlockProps = {
  content: any;
};

const TextContent = ({ content }: TextContentBlockProps) => {
  useEffect(() => {
    Prism.highlightAll();
  });
  return (
    <div className={styles.editor}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

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
      return <TextContent content={slide.content} />;
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
