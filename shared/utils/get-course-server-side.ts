/* eslint-disable import/prefer-default-export */
import { GetServerSideProps } from 'next';
import { buildUrl } from './build-url';

export const getCourseServerSide: GetServerSideProps = async ({ req, params }) => {
  if (Number.isNaN(+params?.id!)) {
    return { props: {}, notFound: true };
  }
  const response = await fetch(buildUrl(`/course/${params?.id}`), {
    headers: {
      cookie: req.headers.cookie as string,
    },
  });
  const { success, body } = await response.json();
  if (!success) {
    return { props: {}, notFound: true };
  }
  return { props: { course: body } };
};
