import React, { useEffect } from 'react';
import { setTitle } from '../../store/title';
import styles from './create-course.module.scss';
import Input from '../../shared/components/input/input.component';
import Button from '../../shared/components/button/button.component';

export default function CreateCoursePage() {
  useEffect(() => {
    setTitle('Создать курс');
  });
  return (
    <div className={styles.card}>
      <Input placeholder="Название курса" />
      <Input placeholder="Ссылка на картинку" />
      <br />
      <Button>Опубликовать</Button>
      <br />
      <div>List of lessons</div>
      <br />
      <Button>Сохранить</Button>
    </div>
  );
}
