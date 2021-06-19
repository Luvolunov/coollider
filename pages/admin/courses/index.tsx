import React, { useEffect } from 'react';
import Link from 'next/link';
import { setTitle } from '../../../store/title';
import Button from '../../../shared/components/button/button.component';
import Card from '../../../shared/components/card/card.component';
import styles from './courses.module.scss';
import CourseAPI from '../../../shared/api/course.api';
import Spinner from '../../../shared/components/spinner/spinner.component';

export default function Courses() {
  const { data: courses } = CourseAPI.list();
  useEffect(() => {
    setTitle('Курсы');
  });
  return (
    <Card>
      <Link href="/create-course">
        <div>
          <Button>Create course</Button>
        </div>
      </Link>
      <div className={styles.tableOuter}>
        <table>
          <thead>
            <tr>
              <td width={100}>Id</td>
              <td width={100}>Image</td>
              <td width={200}>Name</td>
              <td width={200}>Tools</td>
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
                    <Button>Edit</Button>
                  </td>
                </tr>
              ))
            }
            {
              !courses && <tr><td colSpan={4}><Spinner /></td></tr>
            }
          </tbody>
        </table>
      </div>
    </Card>
  );
}
