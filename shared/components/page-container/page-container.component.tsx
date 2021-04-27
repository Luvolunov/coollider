import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../header/header.component';
import Menu from '../menu/menu.component';
import styles from './page-container.module.scss';
import UserAPI from '../../api/user.api';
import Loader from '../loader/loader.component';

type PageContainerProps = {
  children: any;
};

export default function PageContainer({ children }: PageContainerProps) {
  const { data } = UserAPI.current();
  const router = useRouter();
  useEffect(() => {
    if (!data?.success) {
      router.push('/auth/sign-in');
    }
  }, [data]);
  return !data ? <Loader /> : (
    <div className={styles.container}>
      <Header />
      <Menu />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
