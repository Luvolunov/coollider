import { GetServerSidePropsContext } from 'next';
import { buildUrl } from './build-url';
import { ApiResponse } from '../types/api-response.interface';
import { Lesson } from '../types/lesson.interface';

export async function getLesson({ req, params }: GetServerSidePropsContext, admin = false) {
  const response = await fetch(buildUrl(`/lesson/${admin ? 'admin/' : ''}${params?.id}`), {
    headers: {
      cookie: req.headers.cookie as string,
    },
  });
  return await response.json() as ApiResponse<Lesson>;
}
