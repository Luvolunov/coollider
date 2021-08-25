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
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const nextBlock = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    setCurrentBlockIndex(currentBlockIndex + 1);
    setProgress(((currentBlockIndex + 1) / lesson.blocks.length) * 100);
  };
  return (
    <div className={styles.lesson}>
      <div className={styles.lessonInner}>
        <Progress progress={progress} />
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
        <div className={styles.footerPanel}>
          <button type="button" onClick={goBack} className={styles.closeButton}>
            <img className={styles.closeImage} src="/icons/log-out.svg" alt="Log out" />
          </button>
          <Button onClick={nextBlock} mode="big">
            {
              !started ? 'Начать урок!' : 'Далее'
            }
          </Button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = getLessonServerSide;
