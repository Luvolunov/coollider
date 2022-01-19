/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import highlight from 'highlight.js';
import { Editor } from '@tinymce/tinymce-react';
import { Slide } from '../../types/block.interface';
import { SlideType } from '../../types/slide-type.enum';
import styles from './admin-slide-switcher.module.scss';
import Textfield from '../textfield/textfield.component';

highlight.configure({
  languages: ['javascript', 'html', 'css'],
});

type AdminSliderSwitcherProps = {
  slide: Slide,
  changeHandler: (slide: Slide) => void;
};

export default function AdminSliderSwitcher({ slide, changeHandler }: AdminSliderSwitcherProps) {
  if (!slide) { return null; }
  const [currentSlide, setCurrentSlide] = useState(slide);
  const textChange = (value: string) => {
    const updatedSlide = {
      ...currentSlide,
      content: value,
    };
    setCurrentSlide(updatedSlide);
    changeHandler(updatedSlide);
  };
  const changeCorrectAnswer = (id: string) => {
    const content = {
      ...currentSlide.content,
      correctVariantId: +id,
    };
    const updatedSlide = { ...currentSlide, content };
    setCurrentSlide(updatedSlide);
  };
  const changeQuestion = (question: string) => {
    const content = { ...currentSlide.content, question };
    const updatedSlide = { ...currentSlide, content };
    setCurrentSlide(updatedSlide);
  };
  const changeVariantText = (index: number, text: string) => {
    const variants = [...currentSlide.content.variants];
    variants[index].text = text;
    const content = { ...currentSlide.content, variants };
    const updatedSlide = { ...currentSlide, content };
    setCurrentSlide(updatedSlide);
  };
  useEffect(() => {
    setCurrentSlide(slide);
  }, [slide]);
  useEffect(() => {
    changeHandler(currentSlide);
  }, [currentSlide]);
  switch (slide.type) {
    case SlideType.Text: {
      return (
        <Editor
          id="main-editor"
          plugins="lists code"
          value={currentSlide.content}
          onEditorChange={textChange}
          apiKey="1yseylkrsor84krkkhr6j21ruzy3zl3zi06j6i4mwayl5agx"
          init={{
            plugins: 'codesample',
            toolbar: 'undo redo | formatselect | '
              + 'bold italic backcolor | alignleft aligncenter '
              + 'alignright alignjustify | bullist numlist outdent indent | '
              + 'removeformat | help | codesample',
            codesample_global_prismjs: true,
            codesample_languages: [
              { text: 'HTML/XML', value: 'markup' },
              { text: 'JavaScript', value: 'javascript' },
              { text: 'CSS', value: 'css' },
            ],
            height: '480',
            resize: false
          }}
        />
      );
    }
    case SlideType.Test: {
      return (
        <div className={styles.testSlide}>
          <Textfield
            onChange={({ target }: any) => changeQuestion(target.value)}
            defaultValue={slide.content.question}
            placeholder="Введите вопрос"
          />
          <div className={styles.variants}>
            {
              currentSlide.content
                .variants?.map((variant: { id: number, text: string }, idx: number) => (
                  <div key={`${variant.id}`} className={styles.variant}>
                    <input
                      className={styles.radio}
                      id={`variant-${variant.id}`}
                      type="radio"
                      name="correctAnswer"
                      value={variant.id}
                      onChange={({ target }) => changeCorrectAnswer(target.value)}
                      checked={currentSlide.content.correctVariantId === variant.id}
                    />
                    <label className={styles.label} htmlFor={`variant-${variant.id}`} />
                    <input
                      onChange={({ target }) => changeVariantText(idx, target.value)}
                      value={variant.text}
                      className={styles.variantInput}
                      type="text"
                    />
                  </div>
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
