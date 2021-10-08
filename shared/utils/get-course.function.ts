import { GetServerSidePropsContext } from 'next';
import { buildUrl } from './build-url';
import { ApiResponse } from '../types/api-response.interface';
import { CourseInterface } from '../types/course.interface';

export async function getCourse({ req, params }: GetServerSidePropsContext, admin = false) {
  const response = await fetch(buildUrl(`/course/${admin ? 'admin/' : ''}${params?.id}`), {
    headers: {
      cookie: req.headers.cookie as string,
    },
  });
  return await response.json() as ApiResponse<CourseInterface>;
}
