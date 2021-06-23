/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Form from '../../../shared/components/form/form.component';
import Input from '../../../shared/components/input/input.component';
import styles from './sign-in.module.scss';
import Button from '../../../shared/components/button/button.component';
import { useForm } from '../../../shared/hooks/useForm.hook';
import { SignInSchema } from '../../../shared/schemas/sign-in.schema';
import UserAPI from '../../../shared/api/user.api';

export default function SignInPage() {
  const router = useRouter();
  const {
    handleInput, valid, errors, values,
  } = useForm(SignInSchema);
  const { revalidate } = UserAPI.current();
  const [processing, setProcessing] = useState(false);
  const signIn = async (event: FormEvent) => {
    event.preventDefault();
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
          <h5 style={{ textAlign: 'center' }}>Вход</h5>
          <br />
          <br />
          <Input placeholder="Почта" onChange={handleInput} name="email" errors={errors.email} />
          <br />
          <Input placeholder="Пароль" type="password" onChange={handleInput} name="password" errors={errors.password} />
          <br />
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button processing={processing} type="submit" disabled={!valid}>Войти</Button>
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/auth/sign-up">
              <a>У меня нет аккаунта :(</a>
            </Link>
          </div>
        </Form>
      </main>
    </>
  );
}
