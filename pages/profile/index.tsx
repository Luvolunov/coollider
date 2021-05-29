import React, { useEffect } from 'react';
import { setTitle } from '../../store/title';
import styles from './profile.module.scss';
import UserAPI from '../../shared/api/user.api';

export default function Profile() {
  const { data: user } = UserAPI.current();
  useEffect(() => {
    setTitle('Профиль');
  });
  return (
    <div>
      <div className={styles.mainInfo}>
        <div className={styles.avatar}>
          {user?.firstName[0]}
          {user?.lastName[0]}
        </div>
        <div className={styles.infoColumn}>
          {user?.firstName}
          &nbsp;
          {user?.lastName}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.achievements}>achievement</div>
        <div className={styles.userProgress}>progress</div>
      </div>
    </div>
  );
}
