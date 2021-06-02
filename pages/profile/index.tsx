import React, { useEffect } from 'react';
import Head from 'next/head';
import { setTitle } from '../../store/title';
import styles from './profile.module.scss';
import UserAPI from '../../shared/api/user.api';

export default function Profile() {
  const { data: user } = UserAPI.current();
  useEffect(() => {
    setTitle('Профиль');
  });
  const registrationDate = new Date(user?.createdAt || 0);
  return (
    <>
      <Head>
        <title>
          Профиль | Куллайдер
        </title>
      </Head>
      <div>
        <div className={styles.mainInfo}>
          <div className={styles.avatar}>
            {user?.firstName[0]}
            {user?.lastName[0]}
          </div>
          <div className={styles.infoColumn}>
            <b className={styles.name}>
              {user?.firstName}
              &nbsp;
              {user?.lastName}
            </b>
            <br />
            <br />
            <span className={styles.date}>
              Дата регистрации:&nbsp;
              <b>{registrationDate.toLocaleDateString('ru-RU')}</b>
            </span>
            <br />
            <br />
            <span className={styles.courses}>
              Пройдено курсов:&nbsp;
              <b>0</b>
            </span>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.achievements}>
            <span className={styles.cardTitle}>Достижения</span>
            <div>
              Здесь пока ничего нет
            </div>
          </div>
          <div className={styles.userProgress}>
            <span className={styles.cardTitle}>Прогресс</span>
            <div>
              Здесь пока ничего нет
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
