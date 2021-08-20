/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  FormEvent, useEffect, useState
} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { setTitle } from '../../store/title';
import styles from './edit-course.module.scss';
import Textfield from '../../shared/components/textfield/textfield.component';
import Button from '../../shared/components/button/button.component';
import { useForm } from '../../shared/hooks/useForm.hook';
import { courseSchema } from '../../shared/schemas/course.schema';
import Card from '../../shared/components/card/card.component';
import { CourseInterface } from '../../shared/types/course.interface';
import { getCourseServerSide } from '../../shared/utils/get-course-server-side';
import Modal from '../../shared/components/modal/modal.component';
import { lessonSchema } from '../../shared/schemas/lesson.schema';
import { ApiResponse } from '../../shared/types/api-response.interface';
import { Lesson } from '../../shared/types/lesson.interface';

type EditCourseProps = {
  course: CourseInterface
};

export default function EditCoursePage({ course }: EditCourseProps) {
  const { values, valid, handleInput } = useForm(courseSchema, course);
  const {
    handleInput: handleLessonInput,
    errors: lessonErrors,
    values: lessonValues,
    valid: lessonFormValid,
  } = useForm(lessonSchema);
  const router = useRouter();
  const [showing, setShowing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [lessonCreating, setLessonCreating] = useState(false);
  const [lessons, setLessons] = useState<Array<Lesson>>(course.lessons || []);
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
  const createLesson = async (event: FormEvent) => {
    event.preventDefault();
    if (lessonCreating) { return; }
    const data = { ...lessonValues, courseId: course.id };
    setLessonCreating(true);
    const response = await fetch('/api/lesson/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const lesson = await response.json() as ApiResponse<Lesson>;
    if (lesson.success) {
      setLessons([...lessons, lesson.body]);
    }
    setLessonCreating(false);
    setShowing(false);
  };
  const removeLesson = async (lessonId: number) => {
    await fetch(`/api/lesson/${lessonId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setLessons(lessons?.filter((lesson) => lesson.id !== lessonId));
  };
  useEffect(() => {
    setTitle('Редактировать курс');
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
            <Textfield value={values.name} name="name" onInput={handleInput} placeholder="Название курса" />
            <Textfield value={values.imageUrl} name="imageUrl" onInput={handleInput} placeholder="Ссылка на картинку" />
            <Textfield
              value={values.description}
              name="description"
              onInput={handleInput}
              placeholder="Описание курса"
            />
            <br />
            <Button
              processing={processing}
              onClick={updateCourse}
              disabled={!valid}
            >
              Сохранить
            </Button>
          </div>
          <div className={styles.lessonsPanel}>
            <button onClick={() => setShowing(true)} type="button" className={styles.addLessonButton}>
              <img width={50} src="/plus.svg" alt="plus" />
            </button>
            <br />
            <div className={styles.lessonList}>
              {
                lessons?.map((lesson) => (
                  <div key={`${lesson.id}${lesson.name}`} className={styles.lesson}>
                    <button
                      type="button"
                      className={styles.dragButton}
                      title="delete lesson"
                    />
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
        </div>
      </Card>
      <Modal showing={showing} onRequestToClose={() => setShowing(false)}>
        <form onSubmit={createLesson}>
          <span className={styles.modalTitle}>Создать урок</span>
          <Textfield errors={lessonErrors} name="name" onInput={handleLessonInput} placeholder="Название урока" />
          <br />
          <Button processing={lessonCreating} type="submit" disabled={!lessonFormValid}>Создать</Button>
        </form>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = getCourseServerSide;
