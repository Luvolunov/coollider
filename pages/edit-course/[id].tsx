import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { setTitle } from '../../store/title';
import styles from './edit-course.module.scss';
import Input from '../../shared/components/input/input.component';
import Button from '../../shared/components/button/button.component';
import { useForm } from '../../shared/hooks/useForm.hook';
import { courseSchema } from '../../shared/schemas/course.schema';
import Card from '../../shared/components/card/card.component';
import { CourseInterface } from '../../shared/types/course.interface';
import { getCourseServerSide } from '../../shared/utils/get-course-server-side';

type EditCourseProps = {
  course: CourseInterface
};

export default function EditCoursePage({ course }: EditCourseProps) {
  const { values, valid, handleInput } = useForm(courseSchema, course);
  const router = useRouter();
  const updateCourse = async () => {
    await fetch(`/api/course/${course.id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    await router.push('/admin/courses');
  };
  useEffect(() => {
    setTitle('Обновить курс');
  });
  return (
    <>
      <Head>
        <title>
          {course.name}
          &nbsp;|&nbsp;Редактирование&nbsp;|&nbsp;Куллайдер
        </title>
      </Head>
      <Card>
        <div className={styles.formContainer}>
          <div className={styles.mainInfo}>
            <Input value={values.name} name="name" onInput={handleInput} placeholder="Название курса" />
            <Input value={values.imageUrl} name="imageUrl" onInput={handleInput} placeholder="Ссылка на картинку" />
            <br />
            <Button onClick={updateCourse} disabled={!valid}>Обновить</Button>
          </div>
          <div className={styles.lessonList}>
            <div className={styles.addLessonButton}><img width={50} src="/plus.svg" alt="plus" /></div>
          </div>
        </div>
      </Card>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = getCourseServerSide;