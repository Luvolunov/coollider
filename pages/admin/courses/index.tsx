import React, { useEffect } from 'react';
import Link from 'next/link';
import { setTitle } from '../../../store/title';
import Button from '../../../shared/components/button/button.component';

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
