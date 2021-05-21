import React, { useEffect } from 'react';
import Greetings from '../../shared/components/greetings/greetings.component';
import { setTitle } from '../../store/title';
import Course from '../../shared/components/course/course.component';
import styles from './courses.module.scss';

export default function CoursesPage() {
  useEffect(() => {
    setTitle('Курсы');
  });
  return (
    <section>
      <Greetings />
      <div className={styles.coursesList}>
        <div className={styles.courseOuter}>
          <Course />
        </div>
        <div className={styles.courseOuter}>
          <Course />
        </div>
        <div className={styles.courseOuter}>
          <Course />
        </div>
        <div className={styles.courseOuter}>
          <Course />
        </div>
        <div className={styles.courseOuter}>
          <Course />
        </div>
        <div className={styles.courseOuter}>
          <Course />
        </div>
      </div>
    </section>
  );
}
