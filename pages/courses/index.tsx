import React, { useEffect } from 'react';
import Greetings from '../../shared/components/greetings/greetings.component';
import { setTitle } from '../../store/title';
import Course from '../../shared/components/course/course.component';

export default function CoursesPage() {
  useEffect(() => {
    setTitle('Курсы');
  });
  return (
    <section>
      <Greetings />
      <div style={{ marginTop: '30px' }}>
        <Course />
      </div>
    </section>
  );
}
