import React from 'react';
import classnames from 'classnames';
import { Slide } from '../../shared/types/block.interface';
import styles from '../slide-switcher/slide-switcher.module.scss';

type TestSlideProps = {
  slide: Slide;
  correct?: boolean,
  answered?: boolean,
  onChange: (value: number) => void
};

export function TestSlide({
  slide, correct, onChange, answered,
}: TestSlideProps) {
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
  const result = correct ? 'Верно' : 'Неверно';
  return (
    <div className={styles.testSlideOuter}>
      <span className={styles.question}>{slide.content.question}</span>
      <div className={gradeClasses}>
        {result}
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

TestSlide.defaultProps = {
  answered: false,
  correct: false,
};
