import React from 'react';
import { useRouter } from 'next/router';
import styles from './lesson.module.scss';
import Button from '../../shared/components/button/button.component';

export default function Lesson() {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <div className={styles.lesson}>
      <div className={styles.lessonInner}>
        <img className={styles.courseImage} src="/biology.svg" alt="Course" />
        <h1 className={styles.lessonName}>Введение в веб-разработку</h1>
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
