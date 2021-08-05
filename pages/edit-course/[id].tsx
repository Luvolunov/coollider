import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
  const [processing, setProcessing] = useState(false);
  const [lessons, setLessons] = useState(course.lessons);
  const updateCourse = async () => {
    if (processing) { return; }
    setProcessing(true);
    await fetch(`/api/course/${course.id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    setProcessing(false);
    await router.push('/admin/courses');
  };
  const removeLesson = async (lessonId: number) => {
    await fetch(`/api/lesson/${lessonId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    alert('Lesson was deleted');
    setLessons(lessons?.filter((lesson) => lesson.id !== lessonId));
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
            <Button
              processing={processing}
              onClick={updateCourse}
              disabled={!valid}
            >
              Обновить
            </Button>
          </div>
          <div className={styles.lessonList}>
            <Link href="/create-lesson/[id]" as={`/create-lesson/${course.id}`}>
              <button type="button" className={styles.addLessonButton}>
                <img width={50} src="/plus.svg" alt="plus" />
              </button>
            </Link>
            <br />
            {
              lessons?.map((lesson) => (
                <div key={`${lesson.id}${lesson.name}`} className={styles.lesson}>
                  <button
                    type="button"
                    className={styles.dragButton}
                    title="delete lesson"
                  >
                    <img className={styles.buttonImage} src="/dots.svg" alt="delete lesson" />
                  </button>
                  <span className={styles.lessonName}>{lesson.name}</span>
                  <div>
                    <Link href="/edit-lesson/[id]" as={`/edit-lesson/${lesson.id}`}>
                      <button
                        type="button"
                        className={styles.editButton}
                        title="delete lesson"
                      >
                        <img className={styles.buttonImage} src="/settings.svg" alt="delete lesson" />
                      </button>
                    </Link>
                    <button
                      onClick={() => removeLesson(lesson.id)}
                      type="button"
                      className={styles.removeButton}
                      title="delete lesson"
                    >
                      <img className={styles.buttonImage} src="/delete.svg" alt="delete lesson" />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Card>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = getCourseServerSide;
