import React, { useEffect } from 'react';
import Greetings from '../../shared/components/greetings/greetings.component';
import { setTitle } from '../../store/title';

export default function CoursesPage() {
  useEffect(() => {
    setTitle('Курсы');
  });
  return <Greetings />;
}
