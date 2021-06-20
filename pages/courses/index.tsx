import React, { useEffect } from 'react';
import Link from 'next/link';
import Greetings from '../../shared/components/greetings/greetings.component';
import { setTitle } from '../../store/title';
import Course from '../../shared/components/course/course.component';
import styles from './courses.module.scss';
import CourseAPI from '../../shared/api/course.api';
import { CourseInterface } from '../../shared/types/course.interface';

export default function CoursesPage() {
  const { data } = CourseAPI.list();
  useEffect(() => {
    setTitle('Курсы');
  });
  return (
    <section>
      <Greetings />
      <div className={styles.coursesList}>
        {
          data?.map((course: CourseInterface) => (
            <div key={`${course.authorId}_${course.id}`} className={styles.courseOuter}>
              <Link href="/course/[id]" as={`/course/${course.id}`}>
                <div>
                  <Course course={course} />
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </section>
  );
}
