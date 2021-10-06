import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import RoleAPI from '../../api/role.api';
import { Role } from '../../types/role.interface';
import { setTitle } from '../../../store/title';
import styles from './profile-page.module.scss';
import RoleGuard from '../../components/role-guard/role-guard.component';
import { Roles } from '../../types/roles.enum';
import Button from '../../components/button/button.component';
import { User } from '../../types/user.interface';

type ProfileProps = {
  user: User
};

export default function ProfilePage({ user }: ProfileProps) {
  const { data: roles } = RoleAPI.list();
  const roleMapValue = user?.roles.reduce(
    (acc, role) => ({ ...acc, [role.id]: role }),
    {},
  ) as { [key: number]: Role };
  const [savingRoles, setSavingRoles] = useState(false);
  const [roleMap, setRoleMap] = useState(roleMapValue);
  useEffect(() => {
    setTitle('Профиль');
  });
  const registrationDate = new Date(user?.createdAt || 0);
  const roleIsActive = (roleId: number) => classNames(styles.role, {
    [styles.active]: !!roleMap[roleId],
  });
  const toggleRole = (role: Role) => {
    const map = { ...roleMap };
    if (map[role.id]) {
      delete map[role.id];
      setRoleMap(map);
      return;
    }
    map[role.id] = role;
    setRoleMap(map);
  };
  const saveRoles = async () => {
    if (savingRoles) { return; }
    const body = { userId: user?.id, roles: Object.keys(roleMap) };
    setSavingRoles(true);
    await fetch('/api/user/setRoles', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setSavingRoles(false);
  };
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
        <RoleGuard someRoles={[Roles.CanManageRoles]}>
          <div className={styles.rolesBlock}>
            <div className={styles.rolesInner}>
              {
                roles?.map((role) => (
                  <button
                    onClick={() => toggleRole(role)}
                    type="button"
                    className={roleIsActive(role.id)}
                    key={role.name}
                  >
                    {role.name}
                  </button>
                ))
              }
            </div>
            <div className={styles.buttonOuter}>
              <Button processing={savingRoles} onClick={saveRoles}>Сохранить</Button>
            </div>
          </div>
        </RoleGuard>
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
        <br />
      </div>
    </>
  );
}
