/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styles from './course.module.scss';
import CircleProgress from '../circle-progress/circle-progress.component';
import { CourseInterface } from '../../shared/types/course.interface';

type CourseProps = {
  course: CourseInterface
};

export default function Course({ course }: CourseProps) {
  const progress = course.lessonsCount
    ? +((course.completedLessons! / course.lessonsCount!) * 100).toFixed(0)
    : 0;
  return (
    <div className={styles.courseOuter}>
      <div className={styles.course}>
        <div className={styles.imageOuter}>
          <img className={styles.image} src={course.imageUrl} alt="dna" />
        </div>
        <span className={styles.title}>{course.name}</span>
        <div className={styles.progressOuter}>
          <CircleProgress progress={progress} />
          <span className={styles.textOuter}>
            Пройдено {course?.completedLessons} уроков из
            {' '}
            {course?.lessonsCount || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
