/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useRouter } from 'next/router';
import styles from './greetings.module.scss';
import UserAPI from '../../api/user.api';
import Button from '../button/button.component';

const getMessageByHours = (hours: number) => {
  if (hours > 6 && hours < 12) { return 'Доброе утро'; }
  if (hours > 11 && hours < 18) { return 'Добрый день'; }
  if (hours < 23) { return 'Добрый вечер'; }
  return 'Доброй ночи';
};

export default function Greetings() {
  const { data } = UserAPI.current();
  const router = useRouter();
  const hours = (new Date()).getHours();
  const greetingsPhrase = getMessageByHours(hours);
  return (
    <section className={styles.greetings}>
      {
        data ? (
          <>
            <h2 className={styles.title}>{greetingsPhrase}, {data?.firstName}!</h2>
            <span className={styles.text}>
              Ниже мы подобрали список курсов для вас.
            </span>
            <span className={styles.text}>
              Приятного обучения!
            </span>
          </>
        ) : (
          <>
            <h2 className={styles.title}>Добро пожаловать в Куллайдер!</h2>
            <span className={styles.text}>
              Хотите научиться создавать сайты, но нет никаких знаний об этом?
            </span>
            <span className={styles.text}>
              Тогда начните изучать веб-разработку прямо сейчас!
            </span>
            <br />
            <Button onClick={() => router.push('/auth/sign-in')} mode="big">Начать</Button>
          </>
        )
      }
    </section>
  );
}
