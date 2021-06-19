/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FormEvent } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Form from '../../../shared/components/form/form.component';
import Input from '../../../shared/components/input/input.component';
import { useForm } from '../../../shared/hooks/useForm.hook';
import styles from './sign-up.module.scss';
import { SignUpSchema } from './sign-up.schema';
import Button from '../../../shared/components/button/button.component';
import Checkbox from '../../../shared/components/checkbox/checkbox.component';

export default function SignUpPage() {
  const {
    handleInput,
    handleCheckbox,
    valid,
    errors,
    values,
  } = useForm(SignUpSchema);
  const router = useRouter();
  const signUp = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch('/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const { success } = await res.json();
    if (!success) {
      alert('Something went wrong');
      return;
    }
    await router.push('/auth/sign-in');
  };
  return (
    <>
      <Head>
        <title>Зарегистрироваться в Coollider!</title>
      </Head>
      <main className={styles.page}>
        <Form onSubmit={signUp} style={{ maxWidth: '450px' }}>
          <h5 style={{ textAlign: 'center' }}>Регистрация</h5>
          <br />
          <Input
            name="firstName"
            placeholder="Имя"
            onChange={handleInput}
            errors={errors.firstName}
          />
          <br />
          <Input
            name="lastName"
            placeholder="Фамилия"
            onChange={handleInput}
            errors={errors.lastName}
          />
          <br />
          <Input
            name="email"
            placeholder="Почта"
            onChange={handleInput}
            errors={errors.email}
          />
          <br />
          <Input
            name="password"
            placeholder="Пароль"
            onChange={handleInput}
            type="password"
            errors={errors.password}
          />
          <br />
          <Checkbox name="agreement" onChange={handleCheckbox}>Я согласен с условиями пользования</Checkbox>
          <br />
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button type="submit" disabled={!valid}>Зарегистрироваться</Button>
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/auth/sign-in">
              <a>У меня есть аккаунт :)</a>
            </Link>
          </div>
        </Form>
      </main>
    </>
  );
}
