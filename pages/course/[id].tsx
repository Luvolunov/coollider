/* eslint-disable jsx-a11y/anchor-is-valid,react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import styles from './course.module.scss';
import { setTitle } from '../../store/title';
import Card from '../../shared/components/card/card.component';
import { CourseInterface } from '../../shared/types/course.interface';
import UserAPI from '../../shared/api/user.api';
import Modal from '../../shared/components/modal/modal.component';
import Button from '../../shared/components/button/button.component';
import { getCourse } from '../../shared/utils/get-course.function';

type CourseProps = {
  course: CourseInterface;
};

export default function Course({ course }: CourseProps) {
  const { data: user } = UserAPI.current();
  const [showing, setShowing] = useState(false);
  const router = useRouter();
  const goToLesson = (id: number) => {
    if (user) {
      router.push(`/lesson/${id}`);
      return;
    }
    setShowing(true);
  };
  const lessonClasses = (completed: boolean | undefined) => classnames(styles.lesson, {
    [styles.completed]: completed,
  });
  useEffect(() => {
    setTitle('Курс');
  });
  return (
    <>
      <Head>
        <title>
          {course.name} | Куллайдер
        </title>
        <meta name="author" content={course.authorName} />
        <meta name="description" content={course.description} />
        <meta property="og:title" content={course.name} />
        <meta property="og:description" content={course.description} />
        <meta property="og:image" content={`https://learn.coollider.ru${course.imageUrl}`} />
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
                  <button
                    key={`${lesson.id}${lesson.name}`}
                    type="button"
                    onClick={() => goToLesson(lesson.id)}
                    className={lessonClasses(lesson.completed)}
                  >
                    <div>
                      <b>
                        Урок&nbsp;
                        {index + 1}
                      </b>
                      <br />
                      {lesson.name}
                    </div>
                    <img width={20} src={lesson.completed ? '/check.svg' : '/play.svg'} alt="lesson state" />
                  </button>
                ))
              }
            </div>
          </div>
        </Card>
      </div>
      <br />
      <Modal showing={showing} onRequestToClose={() => setShowing(false)}>
        <span className={styles.modalTitle}>Подожди!</span>
        <span className={styles.message}>
          Прежде, чем начать проходить уроки, нужно авторизоваться, чтобы не потерять свой прогресс
        </span>
        <div className={styles.buttonOuter}>
          <Button onClick={() => router.push('/auth/sign-in')} mode="big">Войти</Button>
        </div>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (Number.isNaN(+ctx.params?.id!)) {
    return { props: {}, notFound: true };
  }
  const { success, body: course } = await getCourse(ctx);
  if (!success) {
    return { props: {}, notFound: true };
  }
  return { props: { course } };
};
