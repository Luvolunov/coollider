/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { setTitle } from '../../../store/title';
import Button from '../../../shared/components/button/button.component';
import Card from '../../../shared/components/card/card.component';
import styles from './courses.module.scss';
import CourseAPI from '../../../shared/api/course.api';
import Spinner from '../../../shared/components/spinner/spinner.component';
import Modal from '../../../shared/components/modal/modal.component';
import Textfield from '../../../shared/components/textfield/textfield.component';

export default function Courses() {
  const { data: courses } = CourseAPI.list();
  const [showingModal, setShowingModal] = useState(false);
  useEffect(() => {
    setTitle('Курсы');
  });
  return (
    <>
      <Card>
        <Button onClick={() => setShowingModal(true)}>Создать курс</Button>
        <div className={styles.tableOuter}>
          <table>
            <thead>
              <tr>
                <td width={100}>Id</td>
                <td width={100}>Изображение</td>
                <td width={200}>Название</td>
                <td width={200}>Инструменты</td>
              </tr>
            </thead>
            <tbody>
              {
                courses?.map((course) => (
                  <tr key={`${course.id}${course.name}`}>
                    <td>{course.id}</td>
                    <td>
                      <img width={100} src={course.imageUrl} alt={course.name} />
                    </td>
                    <td>{course.name}</td>
                    <td>
                      <Link href="/edit-course/[id]" as={`/edit-course/${course.id}`}>
                        <a><Button>Редактировать</Button></a>
                      </Link>
                    </td>
                  </tr>
                ))
              }
              {
                !courses && (
                  <tr>
                    <td colSpan={4}><Spinner /></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </Card>
      <Modal onRequestToClose={() => setShowingModal(false)} showing={showingModal}>
        <span>Создать курс</span>
        <Textfield placeholder="Название" />
        <Textfield placeholder="Картинка" />
        <Textfield fieldType="textarea" placeholder="Описание" />
        <br />
        <Button>Создать</Button>
      </Modal>
    </>
  );
}
