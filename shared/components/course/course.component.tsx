import React from 'react';
import styles from './course.module.scss';
import CircleProgress from '../circle-progress/circle-progress.component';
import { CourseInterface } from '../../types/course.interface';

type CourseProps = {
  course: CourseInterface
};

export default function Course({ course }: CourseProps) {
  return (
    <div className={styles.courseOuter}>
      <div className={styles.course}>
        <div className={styles.imageOuter}>
          <img className={styles.image} src={course.imageUrl} alt="dna" />
        </div>
        <span className={styles.title}>{course.name}</span>
        <div className={styles.progressOuter}>
          <CircleProgress progress={0} />
          <span className={styles.textOuter}>
            Пройдено 0 уроков из
            {' '}
            {course?.lessonsCount || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
