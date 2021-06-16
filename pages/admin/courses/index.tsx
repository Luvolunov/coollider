import React, { useEffect } from 'react';
import { setTitle } from '../../../store/title';

export default function Courses() {
  useEffect(() => {
    setTitle('Курсы');
  });
  return <div>users</div>;
}
