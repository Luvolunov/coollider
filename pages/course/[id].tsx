import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { setTitle } from '../../store/title';
import Card from '../../shared/components/card/card.component';
import { CourseInterface } from '../../shared/types/course.interface';
import { getCourseServerSide } from '../../shared/utils/get-course-server-side';

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

export const getServerSideProps: GetServerSideProps = getCourseServerSide;
