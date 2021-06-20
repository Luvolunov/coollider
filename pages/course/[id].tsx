import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { setTitle } from '../../store/title';
import Card from '../../shared/components/card/card.component';
import { buildUrl } from '../../shared/utils/build-url';
import { CourseInterface } from '../../shared/types/course.interface';

type CourseProps = {
  course: CourseInterface;
};

export default function Course({ course }: CourseProps) {
  useEffect(() => {
    setTitle('Курс');
  });
  return (
    <>
      <Head>
        <title>
          {course.name}
          &nbsp;|&nbsp;Куллайдер
        </title>
      </Head>
      <Card>
        <img width={150} height={150} src={course.imageUrl} alt={course.name} />
        <span>{course?.name}</span>
      </Card>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  if (Number.isNaN(+params?.id!)) {
    res.writeHead(301, {
      Location: '/courses',
    });
    res.end();
    return { props: {} };
  }
  const response = await fetch(buildUrl(`/course/${params?.id}`), {
    headers: {
      cookie: req.headers.cookie as string,
    },
  });
  const { success, body } = await response.json();
  if (!success) {
    res.writeHead(301, {
      Location: '/courses',
    });
    res.end();
    return { props: {} };
  }
  return { props: { course: body } };
};
