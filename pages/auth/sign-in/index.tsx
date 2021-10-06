/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Form from '../../../shared/components/form/form.component';
import Textfield from '../../../shared/components/textfield/textfield.component';
import styles from './sign-in.module.scss';
import Button from '../../../shared/components/button/button.component';
import { useForm } from '../../../shared/hooks/useForm.hook';
import { SignInSchema } from '../../../shared/schemas/sign-in.schema';
import UserAPI from '../../../shared/api/user.api';
import { authCheck } from '../../../shared/utils/auth-check';

export default function SignInPage() {
  const router = useRouter();
  const {
    handleInput, valid, errors, values,
  } = useForm(SignInSchema);
  const { revalidate } = UserAPI.current();
  const [processing, setProcessing] = useState(false);
  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    if (processing) { return; }
    setProcessing(true);
    const res = await fetch('/api/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    setProcessing(false);
    const { success } = await res.json();
    if (!success) {
      alert('Incorrect email or password');
      return;
    }
    await revalidate();
    await router.push('/courses');
  };
  return (
    <>
      <Head>
        <title>Войти в Coollider!</title>
      </Head>
      <main className={styles.page}>
        <Form onSubmit={signIn} style={{ maxWidth: '400px' }}>
          <h5 className={styles.title}>Вход</h5>
          <div className={styles.formRow}>
            <Textfield placeholder="Почта" onChange={handleInput} name="email" errors={errors.email} />
          </div>
          <div className={styles.formRow}>
            <Textfield placeholder="Пароль" type="password" onChange={handleInput} name="password" errors={errors.password} />
          </div>
          <div className={styles.buttonOuter}>
            <Button processing={processing} type="submit" disabled={!valid}>Войти</Button>
          </div>
          <div className={styles.linkOuter}>
            <Link href="/auth/sign-up">
              <a>У меня нет аккаунта :(</a>
            </Link>
          </div>
        </Form>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = authCheck;
