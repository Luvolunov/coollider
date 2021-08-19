import React, { FormEvent, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { setTitle } from '../../store/title';
import Textfield from '../../shared/components/textfield/textfield.component';
import Card from '../../shared/components/card/card.component';
import Button from '../../shared/components/button/button.component';
import styles from './create-lesson.module.scss';
import { useForm } from '../../shared/hooks/useForm.hook';
import { lessonSchema } from '../../shared/schemas/lesson.schema';

type CreateLessonPageProps = {
  courseId: number;
};

export default function CreateLessonPage({ courseId }: CreateLessonPageProps) {
  const { handleInput, errors, values } = useForm(lessonSchema);
  const router = useRouter();
  useEffect(() => {
    setTitle('Создать урок');
  });
  const createLesson = async (event: FormEvent) => {
    event.preventDefault();
    const data = { ...values, courseId };
    await fetch('/api/lesson/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    await router.push(`/edit-course/${courseId}`);
  };
  return (
    <Card>
      <form onSubmit={createLesson} className={styles.form}>
        <Textfield errors={errors.name} onInput={handleInput} placeholder="Название урока" name="name" />
        <br />
        <Button type="submit">Создать</Button>
      </form>
    </Card>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (Number.isNaN(+params?.id!)) {
    return { props: {}, notFound: true };
  }
  return { props: { courseId: +params?.id! } };
};
