import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Slide } from '../../types/block.interface';
import { SlideType } from '../../types/slide-type.enum';
import styles from './admin-slider-switcher.module.scss';
import Textfield from '../textfield/textfield.component';

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
        </div>
      );
    }
    default: {
      return null;
    }
  }
}
