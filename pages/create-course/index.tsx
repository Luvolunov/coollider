import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setTitle } from '../../store/title';
import styles from './create-course.module.scss';
import Input from '../../shared/components/input/input.component';
import Button from '../../shared/components/button/button.component';
import { useForm } from '../../shared/hooks/useForm.hook';
import { createCourseSchema } from './create-course.schema';
import Card from '../../shared/components/card/card.component';

export default function CreateCoursePage() {
  const { values, valid, handleInput } = useForm(createCourseSchema);
  const router = useRouter();
  const createCourse = async () => {
    await fetch('/api/course/create', {
      method: 'POST',
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
    setTitle('Создать курс');
  });
  return (
    <Card>
      <div className={styles.mainInfo}>
        <Input name="name" onInput={handleInput} placeholder="Название курса" />
        <Input name="imageUrl" onInput={handleInput} placeholder="Ссылка на картинку" />
      </div>
      <br />
      <Button onClick={createCourse} disabled={!valid}>Сохранить</Button>
    </Card>
  );
}
