import React from 'react';
import styles from './card.module.scss';

type CardProps = {
  children: any;
};

export default function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>;
}
