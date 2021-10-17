/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Form from '../../../shared/components/form/form.component';
import Textfield from '../../../shared/components/textfield/textfield.component';
import { useForm } from '../../../shared/hooks/useForm.hook';
import styles from './sign-up.module.scss';
import { SignUpSchema } from '../../../shared/schemas/sign-up.schema';
import Button from '../../../shared/components/button/button.component';
import Checkbox from '../../../shared/components/checkbox/checkbox.component';
import { authCheck } from '../../../shared/utils/auth-check';

export default function SignUpPage() {
  const {
    handleInput,
    handleCheckbox,
    valid,
    errors,
    values,
  } = useForm(SignUpSchema);
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const signUp = async (event: FormEvent) => {
    event.preventDefault();
    if (processing) { return; }
    setProcessing(true);
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
    setProcessing(false);
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
          <div className={styles.logoOuter}>
            <img className={styles.logo} src="/big-logo.svg" alt="logo" />
          </div>
          <div className={styles.nameFields}>
            <div className={styles.nameFieldOuter}>
              <Textfield
                name="firstName"
                placeholder="Имя"
                onChange={handleInput}
                errors={errors.firstName}
              />
            </div>
            <div className={styles.nameFieldOuter}>
              <Textfield
                name="lastName"
                placeholder="Фамилия"
                onChange={handleInput}
                errors={errors.lastName}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <Textfield
              name="email"
              placeholder="Почта"
              onChange={handleInput}
              errors={errors.email}
            />
          </div>
          <div className={styles.formRow}>
            <Textfield
              name="password"
              placeholder="Пароль"
              onChange={handleInput}
              type="password"
              errors={errors.password}
            />
          </div>
          <div className={styles.formRow}>
            <Checkbox name="agreement" onChange={handleCheckbox}>Я согласен с условиями пользования</Checkbox>
          </div>
          <div className={styles.buttonOuter}>
            <Button processing={processing} type="submit" disabled={!valid}>Зарегистрироваться</Button>
          </div>
          <div className={styles.linkOuter}>
            <Link href="/auth/sign-in">
              <a>У меня есть аккаунт :)</a>
            </Link>
          </div>
        </Form>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = authCheck;
