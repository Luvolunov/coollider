import { GetServerSidePropsContext } from 'next';
import { buildUrl } from './build-url';
import { ApiResponse } from '../types/api-response.interface';
import { Lesson } from '../types/lesson.interface';
import { SlideType } from '../types/slide-type.enum';

export async function getLesson({ req, params }: GetServerSidePropsContext, admin = false) {
  const lessonResponse = await fetch(buildUrl(`/lesson/${admin ? 'admin/' : ''}${params?.id}`), {
    headers: {
      cookie: req.headers.cookie as string,
    },
  });
  const lesson = await lessonResponse.json() as ApiResponse<Lesson>;
  lesson.body.blocks = lesson.body.blocks.map((slide) => {
    if (slide.type === SlideType.Test) {
      return { ...slide, content: JSON.parse(slide.content) };
    }
    return { ...slide };
  });
  return lesson;
}
