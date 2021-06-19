import React, { useEffect } from 'react';
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
            <td width={300}>Name</td>
            <td width={400}>Mail</td>
          </tr>
          </thead>
          <tbody>
          {
            users?.map((user) => (
              <tr key={`${user.id}${user.firstName}`}>
                <td>{user.id}</td>
                <td>
                  {user.firstName}
                  &nbsp;
                  {user.lastName}
                </td>
                <td>{user.email}</td>
              </tr>
            ))
          }
          {
            !users && <tr><td colSpan={3}><Spinner /></td></tr>
          }
          </tbody>
        </table>
      </div>
    </Card>
  );
}
