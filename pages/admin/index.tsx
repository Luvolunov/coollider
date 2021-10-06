/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { setTitle } from '../../store/title';
import styles from './admin.module.scss';
import { Roles } from '../../shared/types/roles.enum';
import RoleGuard from '../../shared/components/role-guard/role-guard.component';
import { ApiResponse } from '../../shared/types/api-response.interface';
import { User } from '../../shared/types/user.interface';
import Card from '../../shared/components/card/card.component';

export default function AdminPage() {
  useEffect(() => {
    setTitle('Админка');
  });
  return (
    <div className={styles.widgetList}>
      <RoleGuard someRoles={[Roles.CanEditUser]}>
        <div className={styles.widgetOuter}>
          <Link href="/admin/users">
            <div>
              <Card>
                <div className={styles.widget}>
                  Users
                </div>
              </Card>
            </div>
          </Link>
        </div>
      </RoleGuard>
      <RoleGuard someRoles={[Roles.CanCreateCourse]}>
        <div className={styles.widgetOuter}>
          <Link href="/admin/courses">
            <div>
              <Card>
                <div className={styles.widget}>
                  Courses
                </div>
              </Card>
            </div>
          </Link>
        </div>
      </RoleGuard>
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
  const canSee = !!user?.roles.find((role) => !!roles.find((roleId) => role.id === roleId));
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
