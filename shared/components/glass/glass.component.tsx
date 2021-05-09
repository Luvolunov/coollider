import React from 'react';
import styles from './glass.module.scss';

type GlassProps = {
  children: any;
};

export default function Glass({ children }: GlassProps) {
  return <div className={styles.glass}>{children}</div>;
}
