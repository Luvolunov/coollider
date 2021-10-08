/* eslint-disable import/prefer-default-export */
import { GetServerSideProps } from 'next';
import { buildUrl } from './build-url';
import { SlideType } from '../types/slide-type.enum';

export const getLessonServerSide: (admin?: boolean) => GetServerSideProps = (admin) => async ({
  req,
  params,
}) => {
  if (Number.isNaN(+params?.id!)) {
    return { props: {}, notFound: true };
  }
  const response = await fetch(buildUrl(`/lesson/${admin ? 'admin/' : ''}${params?.id}`), {
    headers: {
      cookie: req.headers.cookie as string,
    },
  });
  const { success, body } = await response.json();
  if (!success) {
    return { props: {}, notFound: true };
  }
  body.blocks = body?.blocks.map((slide: any) => {
    if (slide.type === SlideType.Test) {
      return { ...slide, content: JSON.parse(slide.content) };
    }
    return slide;
  });
  return { props: { lesson: body } };
};
