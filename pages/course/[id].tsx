/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
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
        <meta name="author" content={course.authorName} />
        <meta name="description" content={course.description} />
        <meta property="og:title" content={course.name} />
        <meta property="og:description" content={course.description} />
        <meta property="og:image" content={course.imageUrl} />
        <meta property="og:locale" content="ru_RU" />
      </Head>
      <div className={styles.cardOuter}>
        <Card>
          <div className={styles.cardInner}>
            <div className={styles.container}>
              <img width={150} height={150} src={course.imageUrl} alt={course.name} />
              <div className={styles.info}>
                <span className={styles.title}>{course.name}</span>
                <span className={styles.description}>{course.description}</span>
              </div>
            </div>
            <div className={styles.lessonsOuter}>
              {
                course.lessons?.map((lesson, index) => (
                  <Link href="/lesson/[id]" as={`/lesson/${lesson.id}`} key={`${lesson.id}${lesson.name}`}>
                    <a className={styles.lesson}>
                      <div>
                        <b>
                          Урок&nbsp;
                          {index + 1}
                        </b>
                        <br />
                        {lesson.name}
                      </div>
                      <img width={20} src="/play.svg" alt="Begin lesson" />
                    </a>
                  </Link>
                ))
              }
            </div>
          </div>
        </Card>
      </div>
      <br />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = getCourseServerSide;
