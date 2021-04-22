import React, { FormEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Form from '../../../shared/components/form/form.component';
import Input from '../../../shared/components/input/input.component';
import styles from './sign-in.module.scss';
import Button from '../../../shared/components/button/button.component';
import { useForm } from '../../../shared/hooks/useForm.hook';
import { SignInSchema } from '../../../shared/schemas/sign-in.schema';
import buildUrl from '../../../shared/utils/build-url';

export default function SignInPage() {
  const {
    handleInput, valid, errors, values,
  } = useForm(SignInSchema);
  const router = useRouter();
  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch(buildUrl('/auth/sign-in'), {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    });
    const { success } = await res.json();
    const resProfile = await fetch(buildUrl('/user/profile'));
    console.log(resProfile.json());
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
            <Button type="submit" disabled={!valid}>Войти</Button>
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
