import React from 'react';
import styles from './course.module.scss';
import Glass from '../glass/glass.component';
import CircleProgress from '../circle-progress/circle-progress.component';

export default function Course() {
  return (
    <div className={styles.courseOuter}>
      <Glass>
        <div className={styles.course}>
          <img className={styles.image} src="/html.svg" alt="dna" />
          <span className={styles.title}>Тайны HTML</span>
          <div className={styles.progressOuter}>
            <CircleProgress progress={50} />
            <span className={styles.textOuter}>
              Пройдено 6 уроков из 12
            </span>
          </div>
        </div>
      </Glass>
    </div>
  );
}
