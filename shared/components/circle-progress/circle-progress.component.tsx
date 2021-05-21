import React from 'react';
import styles from './circle-progress.module.scss';

type CircleProgressProps = {
  progress: number;
};

export default function CircleProgress({ progress }: CircleProgressProps) {
  console.log(progress);
  const circumference = 23.5 * 2 * Math.PI;
  const progressWidth = circumference - (progress / 100) * circumference;
  return (
    <div className={styles.progress}>
      {progress.toFixed(0)}
      %
      <svg
        className={styles.progressCircle}
        height="50"
        width="50"
      >
        <circle
          className={styles.progressLine}
          stroke="#66A1D9"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progressWidth}
          r="23.5"
          cx="25"
          cy="25"
        />
      </svg>
    </div>
  );
}
