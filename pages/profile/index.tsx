import React from 'react';
import { GetServerSideProps } from 'next';
import ProfilePage from '../../shared/pages/profile-page';
import { buildUrl } from '../../shared/utils/build-url';
import { User } from '../../shared/types/user.interface';

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  return (
    <ProfilePage user={user} />
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(buildUrl('/user/profile'), {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  });
  const { body: user } = await res.json();
  if (!user) {
    return {
      notFound: true,
      props: {},
    };
  }
  return { props: { user } };
};
