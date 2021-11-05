/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { setTitle } from '../../../store/title';
import UserAPI from '../../../shared/api/user.api';
import styles from './users.module.scss';
import Spinner from '../../../shared/components/spinner/spinner.component';
import Card from '../../../shared/components/card/card.component';

export default function Users() {
  useEffect(() => {
    setTitle('Пользователи');
  });
  const { data: users } = UserAPI.list();
  return (
    <Card>
      <div className={styles.cardInner}>
        <table>
          <thead>
            <tr>
              <td width={100}>Id</td>
              <td width={300}>Имя</td>
              <td width={400}>Почта</td>
              <td width={200}>Уникальные / Всего прохождений</td>
            </tr>
          </thead>
          <tbody>
            {
              users?.map((user) => (
                <tr key={`${user.id}${user.firstName}`}>
                  <td>{user.id}</td>
                  <td>
                    <Link href="/admin/user/[id]" as={`/admin/user/${user.id}`}>
                      <span className={styles.link}>
                        {user.firstName}
                        &nbsp;
                        {user.lastName}
                      </span>
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.uniqCompletedLessons} / {user.completedLessons}</td>
                </tr>
              ))
            }
            {
              !users && <tr><td colSpan={4}><Spinner /></td></tr>
            }
          </tbody>
        </table>
      </div>
    </Card>
  );
}
