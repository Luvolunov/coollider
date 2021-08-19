import React, { FormEvent, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { setTitle } from '../../store/title';
import Textfield from '../../shared/components/textfield/textfield.component';
import Card from '../../shared/components/card/card.component';
import Button from '../../shared/components/button/button.component';
import styles from './edit-lesson.module.scss';
import { useForm } from '../../shared/hooks/useForm.hook';
import { lessonSchema } from '../../shared/schemas/lesson.schema';
import { Lesson } from '../../shared/types/lesson.interface';
import { getLessonServerSide } from '../../shared/utils/get-lesson-server-side';

type EditLessonPageProps = {
  lesson: Lesson;
};

export default function EditLessonPage({ lesson }: EditLessonPageProps) {
  const { handleInput, errors, values } = useForm(lessonSchema, lesson);
  const router = useRouter();
  useEffect(() => {
    setTitle('Редактировать урок');
  });
  const createLesson = async (event: FormEvent) => {
    event.preventDefault();
    const data = { id: lesson.id, ...values };
    await fetch(`/api/lesson/${lesson.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    await router.push(`/edit-course/${lesson.courseId}`);
  };
  return (
    <Card>
      <form onSubmit={createLesson} className={styles.form}>
        <Textfield value={values.name} onInput={handleInput} placeholder="Название урока" name="name" errors={errors.name} />
        <br />
        <Button type="submit">Сохранить</Button>
      </form>
    </Card>
  );
}

export const getServerSideProps: GetServerSideProps = getLessonServerSide;
