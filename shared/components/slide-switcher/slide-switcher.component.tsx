import React from 'react';
import classnames from 'classnames';
import { Editor } from '@tinymce/tinymce-react';
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
        <div className={styles.editor}>
          <Editor
            id="main-editor"
            plugins="lists code"
            value={slide.content}
            apiKey="1yseylkrsor84krkkhr6j21ruzy3zl3zi06j6i4mwayl5agx"
            disabled
            init={{
              plugins: 'codesample',
              toolbar: '',
              codesample_global_prismjs: true,
              codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
              ],
              resize: false,
              readonly: true,
              inline: true,
            }}
          />
        </div>
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
