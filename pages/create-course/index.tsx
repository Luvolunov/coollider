import { useEffect } from 'react';
import { setTitle } from '../../store/title';

export default function CreateCoursePage() {
  useEffect(() => {
    setTitle('Создать курс');
  });
  return 'Create course';
}
