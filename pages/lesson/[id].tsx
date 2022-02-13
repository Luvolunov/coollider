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
  lesson: Lesson;
};

enum LessonStage {
  notStarted,
  progress,
  chosen,
  answered,
  completed,
}

export default function LessonPage({ lesson }: LessonPageProps) {
  const router = useRouter();
  const goBack = () => router.push(`/course/${lesson.courseId}`);
  const [lessonStage, setLessonStage] = useState(LessonStage.notStarted);
  const [buttonCaption, setButtonCaption] = useState('Начать');
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [slideChanging, setSlideChanging] = useState(false); // fixes rendering bug of the quill js
  const [activityData, setActivityData] = useState({
    rate: 0,
    message: '',
    correctAnswerCount: 0,
  });
  const completeLesson = async () => {
    const body = {
      lessonId: lesson.id,
      questionCount: lesson.blocks.filter((slide) => slide.type === SlideType.Test).length,
      ...activityData,
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
    if (lessonStage === LessonStage.chosen) {
      setLessonStage(LessonStage.answered);
      setButtonCaption('Далее');
      if (correct) {
        setActivityData({
          ...activityData,
          correctAnswerCount: activityData.correctAnswerCount + 1,
        });
      }
      return;
    }
    setSlideChanging(true);
    setCurrentBlockIndex(currentBlockIndex + 1);
  };
  const onAnswer = (variant: number) => {
    setCorrect(variant === lesson.blocks[currentBlockIndex].content.correctVariantId);
    setLessonStage(LessonStage.chosen);
    setButtonCaption('Проверить');
  };
  const buttonDisabled = lesson.blocks[currentBlockIndex]
    && lesson.blocks[currentBlockIndex].type === SlideType.Test
    && lessonStage !== LessonStage.chosen && lessonStage !== LessonStage.answered;
  useEffect(() => {
    if (!currentBlockIndex) { return; }
    setProgress((currentBlockIndex / lesson.blocks.length) * 100);
    setLessonStage(LessonStage.progress);
    setCorrect(false);
  }, [currentBlockIndex]);
  useEffect(() => {
    if (currentBlockIndex < lesson.blocks.length) { return; }
    setButtonCaption('Завершить');
    setLessonStage(LessonStage.completed);
  }, [currentBlockIndex]);
  useEffect(() => {
    setSlideChanging(false);
  }, [slideChanging]);
  const isSliderShown = (lessonStage === LessonStage.progress
    || lessonStage === LessonStage.chosen
    || lessonStage === LessonStage.answered) && !slideChanging && lesson.blocks[currentBlockIndex];
  return (
    <div className={styles.lesson}>
      <div className={styles.lessonInner}>
        {
          (
            lessonStage === LessonStage.progress
            || lessonStage === LessonStage.chosen
            || lessonStage === LessonStage.answered
          ) && <Progress progress={progress} />
        }
        {
          isSliderShown && (
            <SlideSwitcher
              onChange={onAnswer}
              slide={lesson.blocks[currentBlockIndex]}
              answered={lessonStage === LessonStage.answered}
              correct={correct}
            />
          )
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
              <Rating onChange={(rate) => setActivityData({ ...activityData, rate })} />
              <div style={{ opacity: activityData.rate ? 1 : 0 }} className={styles.textfieldOuter}>
                <Textfield
                  onChange={
                    ({ target: { value: message } }) => setActivityData({
                      ...activityData, message,
                    })
                  }
                  placeholder="Поделитесь своим мнением"
                  fieldType="textarea"
                />
              </div>
            </div>
          )
        }
        <div className={styles.footerPanel}>
          {
            lessonStage !== LessonStage.completed && (
              <button type="button" onClick={goBack} className={styles.closeButton}>
                <img className={styles.closeImage} src="/icons/log-out.svg" alt="Log out" />
              </button>
            )
          }
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
  const { success, body: lesson, message } = await getLesson(ctx);
  if (message === 'Unauthorized') {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: `/auth/sign-in?returnUrl=${ctx.req.url}`,
      },
    };
  }
  if (!success) {
    return { props: {}, notFound: true };
  }
  return { props: { lesson } };
};
