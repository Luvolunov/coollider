import { GetServerSideProps } from 'next';
import { buildUrl } from './build-url';

export const authCheck: GetServerSideProps = async ({ req }) => {
  const res = await fetch(buildUrl('/user/profile'), {
    headers: {
      Cookie: req.headers.cookie || '',
    },
  });
  const { success } = await res.json();
  if (success) {
    return {
      redirect: {
        destination: '/courses',
      },
      props: {},
    };
  }
  return { props: {} };
};
