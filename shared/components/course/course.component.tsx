import React from 'react';
import styles from './course.module.scss';
import Glass from '../glass/glass.component';

export default function Course() {
  return (
    <div className={styles.courseOuter}>
      <Glass>
        <div className={styles.course}>
          <img className={styles.image} src="/dna.svg" alt="dna" />
          <span className={styles.title}>Биология</span>
        </div>
      </Glass>
    </div>
  );
}
