import { GetServerSidePropsContext } from 'next';
import { buildUrl } from './build-url';
import { ApiResponse } from '../types/api-response.interface';
import { CourseInterface } from '../types/course.interface';

export async function getCourse({ req, params }: GetServerSidePropsContext, admin = false) {
  const lessonResponse = await fetch(buildUrl(`/course/${admin ? 'admin/' : ''}${params?.id}`), {
    headers: {
      cookie: req.headers.cookie as string,
    },
  });
  const response = await lessonResponse.json() as ApiResponse<CourseInterface>;
  response.body.lessons?.sort((lesson, nextLesson) => lesson.order - nextLesson.order);
  return response;
}
