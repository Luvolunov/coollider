/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styles from './greetings.module.scss';
import UserAPI from '../../api/user.api';

export default function Greetings() {
  const { data } = UserAPI.current();
  return (
    <section className={styles.greetings}>
      <br />
      {
        data ? (
          <>
            <h2 className={styles.title}>С возвращением!</h2>
            <span className={styles.text}>
              Ниже мы подобрали список курсов для Вас, {data?.firstName}.
            </span>
            <span className={styles.text}>
              Приятного обучения!
            </span>
          </>
        ) : (
          <>
            <h2 className={styles.title}>Добро пожаловать!</h2>
            <span className={styles.text}>
              На нашей платформе ты сможешь пройти курсы для айти профессий!
            </span>
          </>
        )
      }
      <br />
    </section>
  );
}
