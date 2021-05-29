import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { setTitle } from '../../store/title';
import styles from './admin.module.scss';
import Glass from '../../shared/components/glass/glass.component';
import UserAPI from '../../shared/api/user.api';
import CourseAPI from '../../shared/api/course.api';
import Spinner from '../../shared/components/spinner/spinner.component';
import { ApiResponse } from '../../shared/types/api-response.interface';
import { User } from '../../shared/types/user.interface';

export default function AdminPage() {
  const { data: users } = UserAPI.count();
  const { data: courses } = CourseAPI.count();
  useEffect(() => {
    setTitle('Админка');
  });
  return (
    <div className={styles.widgetList}>
      <div className={styles.widgetOuter}>
        <Glass>
          <div className={styles.widget}>
            Users:&nbsp;
            {
              users
                ? users.count
                : <Spinner />
            }
          </div>
        </Glass>
      </div>
      <div className={styles.widgetOuter}>
        <Glass>
          <div className={styles.widget}>
            Courses:&nbsp;
            {
              courses
                ? courses.count
                : <Spinner />
            }
          </div>
        </Glass>
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
  const roles = ['Superuser', 'Admin'];
  const canSee = !!user.roles.find((role) => !!roles.find((roleName) => role.name === roleName));
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
