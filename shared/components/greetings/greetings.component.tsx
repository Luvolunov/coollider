/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useRouter } from 'next/router';
import styles from './greetings.module.scss';
import UserAPI from '../../api/user.api';
import Button from '../button/button.component';

export default function Greetings() {
  const { data } = UserAPI.current();
  const router = useRouter();
  return (
    <section className={styles.greetings}>
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
              Хочешь научиться создавать сайты, но нет практически никаких знаний об этом?
            </span>
            <span className={styles.text}>
              Тогда начни изучать веб-разработку прямо сейчас!
            </span>
            <Button onClick={() => router.push('/auth/sign-in')} mode="big">Войти</Button>
          </>
        )
      }
    </section>
  );
}
