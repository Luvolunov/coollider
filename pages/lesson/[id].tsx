import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import styles from './lesson.module.scss';
import Button from '../../shared/components/button/button.component';
import { Lesson } from '../../shared/types/lesson.interface';
import { getLessonServerSide } from '../../shared/utils/get-lesson-server-side';

type LessonPageProps = {
  lesson: Lesson
};

export default function LessonPage({ lesson }: LessonPageProps) {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <div className={styles.lesson}>
      <div className={styles.lessonInner}>
        <img className={styles.courseImage} src={lesson.courseImage} alt="Course" />
        <h1 className={styles.lessonName}>{lesson.name}</h1>
        <div className={styles.footerPanel}>
          <button type="button" onClick={goBack} className={styles.closeButton}>
            <img className={styles.closeImage} src="/icons/log-out.svg" alt="Log out" />
          </button>
          <Button mode="big">Начать урок!</Button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = getLessonServerSide;
