import React, { useEffect } from 'react';
import { setTitle } from '../../store/title';

export default function AdminPage() {
  useEffect(() => {
    setTitle('Админка');
  });
  return <div>admin</div>;
}
