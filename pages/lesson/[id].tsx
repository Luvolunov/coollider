import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import styles from './lesson.module.scss';
import Button from '../../shared/components/button/button.component';
import { Lesson } from '../../shared/types/lesson.interface';
import Progress from '../../shared/components/progress/progress.component';
import Rating from '../../shared/components/rating/rating.component';
import Textfield from '../../shared/components/textfield/textfield.component';
import SlideSwitcher from '../../shared/components/slide-switcher/slide-switcher.component';
import { SlideType } from '../../shared/types/slide-type.enum';
import { getLesson } from '../../shared/utils/get-lesson.function';

type LessonPageProps = {
  lesson: Lesson
};

enum LessonStage {
  notStarted,
  progress,
  completed,
}

export default function LessonPage({ lesson }: LessonPageProps) {
  const router = useRouter();
  const goBack = () => router.back();
  const [lessonStage, setLessonStage] = useState(LessonStage.notStarted);
  const [buttonCaption, setButtonCaption] = useState('Начать');
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [rate, setRate] = useState<number>();
  const [message, setMessage] = useState('');
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [slideChanging, setSlideChanging] = useState(false); // fixes rendering bug of the quill js
  const completeLesson = async () => {
    const body = {
      lessonId: lesson.id,
      rate,
      message,
      questionCount: lesson.blocks.filter((slide) => slide.type === SlideType.Test).length,
      correctAnswerCount: correctAnswers,
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
    if (lessonStage === LessonStage.completed) {
      await completeLesson();
      await router.push(`/course/${lesson.courseId}`);
      return;
    }
    if (lessonStage === LessonStage.notStarted) {
      setLessonStage(LessonStage.progress);
      setButtonCaption('Далее');
      return;
    }
    setSlideChanging(true);
    setCurrentBlockIndex(currentBlockIndex + 1);
  };
  const onAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setAnswered(true);
  };
  const buttonDisabled = lesson.blocks[currentBlockIndex]
    && lesson.blocks[currentBlockIndex].type === SlideType.Test && !answered;
  useEffect(() => {
    setProgress((currentBlockIndex / lesson.blocks.length) * 100);
    setAnswered(false);
  }, [currentBlockIndex]);
  useEffect(() => {
    if (currentBlockIndex < lesson.blocks.length) { return; }
    setButtonCaption('Завершить');
    setLessonStage(LessonStage.completed);
  }, [currentBlockIndex]);
  useEffect(() => {
    setSlideChanging(false);
  }, [slideChanging]);
  return (
    <div className={styles.lesson}>
      <div className={styles.lessonInner}>
        {
          lessonStage === LessonStage.progress && <Progress progress={progress} />
        }
        {
          lessonStage === LessonStage.progress && !slideChanging && lesson.blocks[currentBlockIndex]
            && <SlideSwitcher onAnswer={onAnswer} slide={lesson.blocks[currentBlockIndex]} />
        }
        {
          lessonStage === LessonStage.notStarted && (
            (
              <div className={styles.firstBlock}>
                <img className={styles.courseImage} src={lesson.courseImage} alt="Course" />
                <h1 className={styles.lessonName}>{lesson.name}</h1>
              </div>
            )
          )
        }
        {
          lessonStage === LessonStage.completed && (
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
          <Button disabled={buttonDisabled} onClick={nextBlock} mode="big">
            {buttonCaption}
          </Button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (Number.isNaN(+ctx.params?.id!)) {
    return { props: {}, notFound: true };
  }
  const { success, body: lesson } = await getLesson(ctx);
  if (!success) {
    return { props: {}, notFound: true };
  }
  return { props: { lesson } };
};
