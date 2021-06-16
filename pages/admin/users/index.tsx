import React, { useEffect } from 'react';
import { setTitle } from '../../../store/title';
import UserAPI from '../../../shared/api/user.api';
import styles from './users.module.scss';
import Spinner from '../../../shared/components/spinner/spinner.component';

export default function Users() {
  useEffect(() => {
    setTitle('Пользователи');
  });
  const { data: users } = UserAPI.list();
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        {
          !users && <Spinner />
        }
        {
          users?.map((user) => (
            <div className={styles.userRow}>
              {user.firstName}
              &nbsp;
              {user.lastName}
              &nbsp;
              {user.email}
            </div>
          ))
        }
      </div>
    </div>
  );
}
