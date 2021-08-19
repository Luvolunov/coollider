import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setTitle } from '../../store/title';
import styles from './create-course.module.scss';
import Textfield from '../../shared/components/textfield/textfield.component';
import Button from '../../shared/components/button/button.component';
import { useForm } from '../../shared/hooks/useForm.hook';
import { courseSchema } from '../../shared/schemas/course.schema';
import Card from '../../shared/components/card/card.component';

export default function CreateCoursePage() {
  const { values, valid, handleInput } = useForm(courseSchema);
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const createCourse = async () => {
    if (processing) { return; }
    setProcessing(true);
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
    setProcessing(false);
    await router.push('/admin/courses');
  };
  useEffect(() => {
    setTitle('Создать курс');
  });
  return (
    <Card>
      <div className={styles.mainInfo}>
        <Textfield name="name" onInput={handleInput} placeholder="Название курса" />
        <Textfield name="imageUrl" onInput={handleInput} placeholder="Ссылка на картинку" />
      </div>
      <br />
      <Button processing={processing} onClick={createCourse} disabled={!valid}>Сохранить</Button>
    </Card>
  );
}
