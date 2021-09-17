import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import styles from './lesson.module.scss';
import Button from '../../shared/components/button/button.component';
import { Lesson } from '../../shared/types/lesson.interface';
import { getLessonServerSide } from '../../shared/utils/get-lesson-server-side';
import Progress from '../../shared/components/progress/progress.component';
import 'react-quill/dist/quill.bubble.css';
import Rating from '../../shared/components/rating/rating.component';
import Textfield from '../../shared/components/textfield/textfield.component';

type LessonPageProps = {
  lesson: Lesson
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

export default function LessonPage({ lesson }: LessonPageProps) {
  const router = useRouter();
  const goBack = () => router.back();
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [buttonCaption, setButtonCaption] = useState('Начать');
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [rate, setRate] = useState<number>();
  const [message, setMessage] = useState('');
  const completeLesson = async () => {
    const body = {
      lessonId: lesson.id,
      rate,
      message,
    };
    await fetch('/api/lesson/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };
  const nextBlock = async () => {
    if (completed) {
      await completeLesson();
      await router.push(`/course/${lesson.courseId}`);
      return;
    }
    if (!started) {
      setStarted(true);
      setButtonCaption('Далее');
      return;
    }
    setCurrentBlockIndex(currentBlockIndex + 1);
    setProgress(((currentBlockIndex + 1) / lesson.blocks.length) * 100);
    if (currentBlockIndex + 1 === lesson.blocks.length) {
      setButtonCaption('Завершить');
      setCompleted(true);
    }
  };
  return (
    <div className={styles.lesson}>
      <div className={styles.lessonInner}>
        {
          started && !completed && <Progress progress={progress} />
        }
        {
          started
            ? (
              <ReactQuillWithNoSSR
                className={styles.editor}
                theme="bubble"
                modules={quillModules}
                value={lesson.blocks[currentBlockIndex]?.content}
                readOnly
              />
            )
            : (
              <div className={styles.firstBlock}>
                <img className={styles.courseImage} src={lesson.courseImage} alt="Course" />
                <h1 className={styles.lessonName}>{lesson.name}</h1>
              </div>
            )
        }
        {
          completed && (
            <div className={styles.lastBlock}>
              <img className={styles.courseImage} src={lesson.courseImage} alt="Course" />
              <h2 className={styles.lastQuestion}>Вы успешно прошли урок!</h2>
              <Rating onChange={(rating) => setRate(rating)} />
              <div className={styles.textfieldOuter}>
                <Textfield
                  onChange={({ target: { value } }) => setMessage(value)}
                  placeholder="Поделитесь своим мнением"
                  fieldType="textarea"
                />
              </div>
            </div>
          )
        }
        <div className={styles.footerPanel}>
          <button type="button" onClick={goBack} className={styles.closeButton}>
            <img className={styles.closeImage} src="/icons/log-out.svg" alt="Log out" />
          </button>
          <Button onClick={nextBlock} mode="big">
            {buttonCaption}
          </Button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = getLessonServerSide;
