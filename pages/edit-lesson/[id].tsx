import React, { FormEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { setTitle } from '../../store/title';
import Textfield from '../../shared/components/textfield/textfield.component';
import Card from '../../shared/components/card/card.component';
import Button from '../../shared/components/button/button.component';
import styles from './edit-lesson.module.scss';
import { useForm } from '../../shared/hooks/useForm.hook';
import { lessonSchema } from '../../shared/schemas/lesson.schema';
import { Lesson } from '../../shared/types/lesson.interface';
import { getLessonServerSide } from '../../shared/utils/get-lesson-server-side';
import 'react-quill/dist/quill.bubble.css';
import { Block } from '../../shared/types/block.interface';

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

type EditLessonPageProps = {
  lesson: Lesson;
};

export default function EditLessonPage({ lesson }: EditLessonPageProps) {
  const { handleInput, errors, values } = useForm(lessonSchema, lesson);
  const [blocks, setBlocks] = useState<Array<Block>>(lesson.blocks || []);
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    setTitle('Редактирование урока');
  });
  const createLesson = async (event: FormEvent) => {
    event.preventDefault();
    const data = { id: lesson.id, blocks, ...values };
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
    const block = {
      order: blocks.length + 1,
      content: '<p><br></p>',
      type: 1,
    };
    setBlocks([...blocks, block]);
  };
  const changeHandler = (value: string) => {
    const block = {
      ...blocks[currentBlockIndex],
      content: value,
    };
    const updatedBlocks = blocks.slice();
    updatedBlocks.splice(currentBlockIndex, 1, block);
    setBlocks(updatedBlocks);
  };
  const activeSlideClasses = (index: number) => classNames(styles.block, {
    [styles.active]: index === currentBlockIndex,
  });
  return (
    <>
      <Card>
        <div className={styles.cardInner}>
          <form onSubmit={createLesson} className={styles.form}>
            <Textfield value={values.name} onInput={handleInput} placeholder="Название урока" name="name" errors={errors.name} />
            <br />
            <Button type="submit">Сохранить</Button>
          </form>
        </div>
      </Card>
      <br />
      <Card>
        <div className={styles.blockPanel}>
          <button onClick={createBlock} type="button" className={styles.createBlockButton}>
            <img width={20} src="/plus.svg" alt="plus" />
          </button>
          {
            blocks.map((slide, index) => (
              <button
                key={Math.random()}
                onClick={() => setCurrentBlockIndex(index)}
                type="button"
                className={activeSlideClasses(index)}
              >
                {slide.order}
              </button>
            ))
          }
        </div>
        {
          !!blocks.length && (
            <div className={styles.currentSlide}>
              <ReactQuillWithNoSSR
                className={styles.editor}
                theme="bubble"
                modules={quillModules}
                value={blocks[currentBlockIndex]?.content}
                onChange={changeHandler}
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
