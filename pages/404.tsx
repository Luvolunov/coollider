import React from 'react';
import { useRouter } from 'next/router';
import styles from './404.module.scss';
import Button from '../shared/components/button/button.component';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className={styles.page}>
      <span className={styles.title}>Упс! Кажется, тут ничего нет :(</span>
      <Button onClick={() => router.back()}>Вернуться</Button>
    </div>
  );
}
