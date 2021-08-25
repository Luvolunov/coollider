import React from 'react';
import styles from './progress.module.scss';

type ProgressProps = {
  progress: number;
};

export default function Progress({ progress }: ProgressProps) {
  return (
    <div className={styles.container}>
      <div style={{ width: `${progress}%` }} className={styles.line} />
    </div>
  );
}
