import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styles from './course.module.scss';
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
        <div className={styles.container}>
          <img width={150} height={150} src={course.imageUrl} alt={course.name} />
          <div className={styles.info}>
            <span className={styles.title}>{course?.name}</span>
            <span className={styles.description}>
              Матема́тика — наука о структурах, порядке и отношениях, исторически сложившаяся
              на основе операций подсчёта, измерения и описания формы объектов.
            </span>
          </div>
        </div>
        <br />
        <br />
        {
          course.lessons?.map((lesson) => (
            <div key={`${lesson.id}${lesson.name}`}>
              <Card>
                <b>{lesson.name}</b>
                <br />
                <span className={styles.description}>Just testing you know</span>
              </Card>
              <br />
            </div>
          ))
        }
      </Card>
      <br />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = getCourseServerSide;
