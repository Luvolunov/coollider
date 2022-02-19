/* eslint-disable jsx-a11y/anchor-is-valid,react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import styles from './course.module.scss';
import { setTitle } from '../../store/title';
import Card from '../../components/card/card.component';
import { CourseInterface } from '../../shared/types/course.interface';
import UserAPI from '../../shared/api/user.api';
import Modal from '../../components/modal/modal.component';
import Button from '../../components/button/button.component';
import { getCourse } from '../../shared/utils/get-course.function';

type CourseProps = {
  course: CourseInterface;
};

export default function Course({ course }: CourseProps) {
  const { data: user } = UserAPI.current();
  const [showing, setShowing] = useState(false);
  const [warningShowing, setWarningShowing] = useState(false);
  const [unauthButtonUrl, setUnauthButtonUrl] = useState('');
  const router = useRouter();
  const goToLesson = (id: number) => {
    const lesson = course.lessons?.find((currentLesson) => currentLesson.id === id);
    if (!lesson?.available) {
      setWarningShowing(true);
      return;
    }
    if (user) {
      router.push(`/lesson/${id}`);
      return;
    }
    setShowing(true);
    setUnauthButtonUrl(`/auth/sign-in?returnUrl=/lesson/${id}`);
  };
  const lessonClasses = (completed: boolean, available: boolean) => classnames(styles.lesson, {
    [styles.completed]: available && completed,
    [styles.unavailable]: !available,
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
                    className={lessonClasses(!!lesson.completed, !!lesson.available)}
                  >
                    <div>
                      <b style={{ fontSize: '1.05rem' }}>
                        {lesson.name}
                      </b>
                      <br />
                      <span style={{ fontWeight: 200 }}>
                        Урок&nbsp;
                        {index + 1}
                      </span>
                    </div>
                    {
                      lesson.available
                        ? (
                          <img width={20} src={lesson.completed && lesson.available ? '/check.svg' : '/play.svg'} alt="lesson state" />
                        ) : (
                          <img width={20} src="/lock.svg" alt="lesson state" />
                        )
                    }
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
          <Button onClick={() => router.push(unauthButtonUrl)} mode="big">Войти</Button>
        </div>
      </Modal>
      <Modal showing={warningShowing} onRequestToClose={() => setWarningShowing(false)}>
        <span className={styles.modalTitle}>Урок недоступен</span>
        <span className={styles.message}>
          В данный момент над уроком ведётся работа. <br />
          Он будет доступен в ближайшее время!
        </span>
        <div className={styles.buttonOuter}>
          <Button onClick={() => setWarningShowing(false)} mode="big">Ок</Button>
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
