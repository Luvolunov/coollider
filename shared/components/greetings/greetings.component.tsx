import React from 'react';
import styles from './greetings.module.scss';
import UserAPI from '../../api/user.api';

export default function Greetings() {
  const { data } = UserAPI.current();
  const username = `${data?.firstName} ${data?.lastName}`;
  return (
    <section className={styles.greetings}>
      <h2 className={styles.title}>Добро пожаловать!</h2>
      <span className={styles.text}>
        Здраствуйте,&nbsp;
        {username}
        , последний раз вы заходили: 10.03.2021
      </span>
      <span className={styles.text}>
        Ваш уровень: 1
      </span>
    </section>
  );
}
