/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import styles from './verify-email.module.scss';
import { ApiResponse } from '../../../shared/types/api-response.interface';
import Button from '../../../shared/components/button/button.component';
import { buildUrl } from '../../../shared/utils/build-url';

type VerifyEmailProps = {
  success: boolean;
};

export default function VerifyEmail({ success }: VerifyEmailProps) {
  return (
    <>
      <Head>
        <title>Подтверждение почты | Куллайдер</title>
      </Head>
      <div className={styles.page}>
        {
          !success
            ? (
              <>
                <div className={styles.container}>
                  Действие ссылки истекло или почта уже подтверждена.
                  <br />
                  <br />
                  <Link href="/auth/sign-in">
                    <a>
                      <Button>Вернуться на страницу входа</Button>
                    </a>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className={styles.container}>
                  Почта успешно подтверждена! :)
                  <br />
                  <br />
                  <Link href="/auth/sign-in">
                    <a>
                      <Button>Войти</Button>
                    </a>
                  </Link>
                </div>
              </>
            )
        }
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.query.token) {
    return {
      notFound: false,
      props: {},
    };
  }
  const body = { token: ctx.query.token };
  const res = await fetch(buildUrl('/auth/verify-email'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const { success } = await res.json() as ApiResponse<any>;
  return { props: { success } };
};
