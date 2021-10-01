/* eslint-disable object-curly-newline,no-param-reassign,jsx-a11y/label-has-associated-control */
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { setTitle } from '../../store/title';
import Textfield from '../../shared/components/textfield/textfield.component';
import Card from '../../shared/components/card/card.component';
import Button from '../../shared/components/button/button.component';
import styles from './edit-lesson.module.scss';
import { useForm } from '../../shared/hooks/useForm.hook';
import { lessonSchema } from '../../shared/schemas/lesson.schema';
import { Lesson } from '../../shared/types/lesson.interface';
import { getLessonServerSide } from '../../shared/utils/get-lesson-server-side';
import { Slide } from '../../shared/types/block.interface';
import Modal from '../../shared/components/modal/modal.component';
import { lessonBlockSchema } from '../../shared/schemas/lesson-block.schema';
import AdminSliderSwitcher from '../../shared/components/admin-slider-switcher/admin-slider-switcher.component';
import { SlideType } from '../../shared/types/slide-type.enum';

type EditLessonPageProps = {
  lesson: Lesson;
};

type LessonSlideProps = {
  onClick: () => void;
  isActive: boolean;
  order: number;
  index: number;
  moveSlide: (from: number, to: number) => void;
};

const slideTypeName = {
  [SlideType.Text]: 'Текст',
  [SlideType.Test]: 'Тест',
};

const LessonSlide = ({ onClick, isActive, order, index, moveSlide }: LessonSlideProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [collected, drag] = useDrag({
    type: 'slide',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      readyToRemove: monitor.getDropResult(),
    }),
    item: () => ({ index }),
  });
  const [dropProps, drop] = useDrop({
    accept: 'slide',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: any, monitor) => {
      const dragIndex = item.index;
      if (dragIndex === index || !ref.current) { return; }

      const hoverSlideRect = ref.current?.getBoundingClientRect();
      const middlePoint = (hoverSlideRect.right - hoverSlideRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as XYCoord).x - hoverSlideRect.left;
      if ((dragIndex < index && hoverClientX < middlePoint)
          || (dragIndex > index && hoverClientX > middlePoint)) { return; }
      setTimeout(() => moveSlide(dragIndex, index));
      item.index = index;
    },
  });
  const activeSlideClasses = classNames(styles.block, {
    [styles.active]: isActive,
  });
  drag(drop(ref));
  return (
    <button
      ref={ref}
      onClick={onClick}
      type="button"
      className={activeSlideClasses}
      style={{
        opacity: collected.isDragging ? '0' : '1',
        cursor: collected.isDragging ? 'move' : 'pointer',
      }}
      data-handler-id={dropProps.handlerId}
    >
      {order}
    </button>
  );
};

export default function EditLessonPage({ lesson }: EditLessonPageProps) {
  const { handleInput, errors, values } = useForm(lessonSchema, lesson);
  const [blocks, setBlocks] = useState<Array<Slide>>(lesson.blocks || []);
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const [slideCreating, setSlideCreating] = useState(false);
  const {
    handleInput: handleBlockInput, values: lessonBlockValues, valid,
  } = useForm(lessonBlockSchema, { blockTypeId: 1 });
  const router = useRouter();
  useEffect(() => {
    setTitle('Редактирование урока');
  });
  const updateLesson = async (event: FormEvent) => {
    event.preventDefault();
    const lessonBlocks = blocks.map((slide) => {
      if (slide.type === SlideType.Test) {
        return { ...slide, content: JSON.stringify(slide.content) };
      }
      return slide;
    });
    const data = { id: lesson.id, blocks: lessonBlocks, ...values };
    await fetch(`/api/lesson/${lesson.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    await router.push(`/edit-course/${lesson.courseId}`);
  };
  const createBlock = () => {
    const block: any = {
      order: blocks.length + 1,
      content: '<p><br></p>',
      type: +lessonBlockValues.blockTypeId,
    };
    if (block.type === 2) {
      block.content = {
        question: '',
        variants: [
          { id: 1, text: 'Вариант ответа 1' },
          { id: 2, text: 'Вариант ответа 2' },
          { id: 3, text: 'Вариант ответа 3' },
          { id: 4, text: 'Вариант ответа 4' },
        ],
        correctVariantId: 1,
      };
    }
    setBlocks([...blocks, block]);
    setSlideCreating(false);
  };
  const changeHandler = (slide: Slide) => {
    const updatedBlocks = blocks.slice();
    updatedBlocks.splice(currentBlockIndex, 1, slide);
    setBlocks(updatedBlocks);
  };
  const removeSlide = (index: number) => {
    const filteredSlides = blocks
      .filter((_, idx) => idx !== index)
      .map((slide, idx) => ({ ...slide, order: idx + 1 }));
    setBlocks(filteredSlides);
  };
  const moveSlide = useCallback((fromIndex: number, toIndex: number) => {
    const slides = blocks.slice();
    if (toIndex > fromIndex) {
      const currentSlide = blocks[fromIndex];
      slides.splice(toIndex + 1, 0, currentSlide);
      slides.splice(fromIndex, 1);
      setCurrentBlockIndex(toIndex);
    } else {
      const currentSlide = blocks[toIndex];
      slides.splice(fromIndex + 1, 0, currentSlide);
      slides.splice(toIndex, 1);
      setCurrentBlockIndex(fromIndex - 1);
    }
    setBlocks(slides);
  }, [blocks]);
  const [, removeDrop] = useDrop({
    accept: 'slide',
    drop: (item: any) => removeSlide(item.index),
  });
  return (
    <>
      <Modal showing={slideCreating} onRequestToClose={() => setSlideCreating(false)}>
        <span className={styles.modalTitle}>Создать слайд</span>
        <br />
        <label htmlFor="slide-type">
          Тип слайда
        </label>
        <select name="blockTypeId" onInput={handleBlockInput} id="slide-type" value={lessonBlockValues.blockTypeId}>
          <option value="1">Текст</option>
          <option value="2">Тест</option>
        </select>
        <br />
        <br />
        <Button disabled={!valid} onClick={createBlock}>Создать</Button>
      </Modal>
      <Card>
        <div className={styles.cardInner}>
          <form onSubmit={updateLesson} className={styles.form}>
            <Textfield value={values.name} onInput={handleInput} placeholder="Название урока" name="name" errors={errors.name} />
            <br />
            <Button type="submit">Сохранить</Button>
          </form>
        </div>
      </Card>
      <br />
      <Card>
        <div ref={removeDrop} className={styles.removePlace}>
          Зона для удаления слайда
        </div>
        <div className={styles.blockPanel}>
          <button onClick={() => setSlideCreating(true)} type="button" className={styles.createBlockButton}>
            <img width={20} src="/plus.svg" alt="plus" />
          </button>
          {
            blocks.map((slide, index) => (
              <LessonSlide
                key={Math.random()}
                onClick={() => setCurrentBlockIndex(index)}
                order={slide.order}
                isActive={index === currentBlockIndex}
                index={index}
                moveSlide={moveSlide}
              />
            ))
          }
        </div>
        {
          !!blocks.length && (
            <div className={styles.currentSlide}>
              <div className={styles.currentSlideHeader}>
                Слайд №
                {currentBlockIndex + 1}
                &nbsp;
                —
                &nbsp;
                {slideTypeName[blocks[currentBlockIndex].type]}
              </div>
              <AdminSliderSwitcher
                slide={blocks[currentBlockIndex]}
                changeHandler={changeHandler}
              />
            </div>
          )
        }
      </Card>
      <br />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = getLessonServerSide;
