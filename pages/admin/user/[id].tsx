import React from 'react';
import { GetServerSideProps } from 'next';
import ProfilePage from '../../../shared/pages/profile-page';
import { buildUrl } from '../../../shared/utils/build-url';
import { User } from '../../../shared/types/user.interface';

type AdminUserProps = {
  user: User,
};

export default function AdminUser({ user }: AdminUserProps) {
  return <ProfilePage user={user} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  if (!params?.id || Number.isNaN(+params.id)) {
    return { notFound: true };
  }
  const userId = params.id;
  const response = await fetch(buildUrl(`/user/${userId}`), {
    headers: {
      cookie: req.headers.cookie || '',
    },
  });
  const { success, body } = await response.json();
  if (!success) {
    return { notFound: true };
  }
  return { props: { user: body } };
};
