import React, { useEffect } from 'react';
import { setTitle } from '../../../store/title';
import Button from '../../../shared/components/button/button.component';
import Link from 'next/link';

export default function Courses() {
  useEffect(() => {
    setTitle('Курсы');
  });
  return (
    <Link href="/create-course">
      <div>
        <Button>Create course</Button>
      </div>
    </Link>
  );
}
