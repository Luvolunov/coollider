/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Slide } from '../../types/block.interface';
import { SlideType } from '../../types/slide-type.enum';
import styles from './admin-slider-switcher.module.scss';
import Textfield from '../textfield/textfield.component';
import 'react-quill/dist/quill.bubble.css';

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

type AdminSliderSwitcherProps = {
  slide: Slide,
  changeHandler: (slide: Slide) => void;
};

export default function AdminSliderSwitcher({ slide, changeHandler }: AdminSliderSwitcherProps) {
  const [currentSlide, setCurrentSlide] = useState(slide);
  const textChange = (value: string) => {
    const updatedSlide = {
      ...currentSlide,
      content: value,
    };
    setCurrentSlide(updatedSlide);
    changeHandler(updatedSlide);
  };
  switch (slide.type) {
    case SlideType.Text: {
      return (
        <ReactQuillWithNoSSR
          className={styles.editor}
          theme="bubble"
          modules={quillModules}
          value={currentSlide.content}
          onChange={textChange}
          placeholder="Введите текст"
        />
      );
    }
    case SlideType.Test: {
      return (
        <div className={styles.testSlide}>
          <Textfield value={slide.content.question} placeholder="Введите вопрос" />
          <div className={styles.variants}>
            <div className={styles.variant}>
              <input className={styles.radio} id="answer-1" type="radio" name="correctAnswer" />
              <label className={styles.label} htmlFor="answer-1" />
              <input className={styles.variantInput} type="text" />
            </div>
            <div className={styles.variant}>
              <input className={styles.radio} id="answer-2" type="radio" name="correctAnswer" />
              <label className={styles.label} htmlFor="answer-2" />
              <input className={styles.variantInput} type="text" />
            </div>
            <div className={styles.variant}>
              <input className={styles.radio} id="answer-3" type="radio" name="correctAnswer" />
              <label className={styles.label} htmlFor="answer-3" />
              <input className={styles.variantInput} type="text" />
            </div>
            <div className={styles.variant}>
              <input className={styles.radio} id="answer-4" type="radio" name="correctAnswer" />
              <label className={styles.label} htmlFor="answer-4" />
              <input className={styles.variantInput} type="text" />
            </div>
          </div>
        </div>
      );
    }
    default: {
      return null;
    }
  }
}
