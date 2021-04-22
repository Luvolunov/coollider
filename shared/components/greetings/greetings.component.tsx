import React from 'react';
import styles from './greetings.module.scss';

export default function Greetings() {
  return (
    <section className={styles.greetings}>
      <h2 className={styles.text}>Добро пожаловать!</h2>
      <span className={styles.text}>
        Здраствуйте Иван Петров, последний раз вы заходили: 10.03.2021
      </span>
      <span className={styles.text}>
        Ваш уровень: 1
      </span>
    </section>
  );
}
