/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styles from './greetings.module.scss';
import UserAPI from '../../api/user.api';

export default function Greetings() {
  const { data } = UserAPI.current();
  return (
    <section className={styles.greetings}>
      <br />
      <h2 className={styles.title}>С возвращением!</h2>
      <span className={styles.text}>
        Ниже мы подобрали список курсов для Вас, {data?.firstName}.
      </span>
      <span className={styles.text}>
        Приятного обучения!
      </span>
      <br />
    </section>
  );
}
