/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { setTitle } from '../../store/title';
import styles from './admin.module.scss';
import Glass from '../../shared/components/glass/glass.component';
import { ApiResponse } from '../../shared/types/api-response.interface';
import { User } from '../../shared/types/user.interface';
import { Roles } from '../../shared/types/roles.enum';

export default function AdminPage() {
  useEffect(() => {
    setTitle('Админка');
  });
  return (
    <div className={styles.widgetList}>
      <div className={styles.widgetOuter}>
        <Link href="/admin/users">
          <div>
            <Glass>
              <div className={styles.widget}>
                Users
              </div>
            </Glass>
          </div>
        </Link>
      </div>
      <div className={styles.widgetOuter}>
        <Link href="/admin/courses">
          <div>
            <Glass>
              <div className={styles.widget}>
                Courses
              </div>
            </Glass>
          </div>
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(`${process.env.API_HOST}/user/profile`, {
    headers: {
      cookie: ctx.req.headers.cookie || '',
    },
  });
  const { body: user } = await res.json() as ApiResponse<User>;
  const roles = [Roles.CanSeeStats, Roles.CanCreateCourse, Roles.CanEditUser];
  const canSee = !!user.roles.find((role) => !!roles.find((roleId) => role.id === roleId));
  if (!canSee) {
    return {
      redirect: {
        destination: '/courses',
        permanent: true,
      },
    };
  }
  return { props: {} };
};
