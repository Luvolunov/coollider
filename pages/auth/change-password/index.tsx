import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Form from '../../../components/form/form.component';
import Textfield from '../../../components/textfield/textfield.component';
import styles from './change-password.module.scss';
import Button from '../../../components/button/button.component';
import { useForm } from '../../../shared/hooks/useForm.hook';
import { ApiResponse } from '../../../shared/types/api-response.interface';
import { ChangePasswordSchema } from '../../../shared/schemas/change-password.schema';
import BigMessage from '../../../components/big-message/big-message.component';

export default function ChangePassword() {
  const {
    handleInput, valid, errors, values,
  } = useForm(ChangePasswordSchema);
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const changePassword = async (event: FormEvent) => {
    event.preventDefault();
    if (!valid) { return; }
    const body = {
      password: values.password,
      token: router.query.token,
    };
    setProcessing(true);
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    setProcessing(false);
    const { success } = await res.json() as ApiResponse;
    if (!success) {
      alert('Something went wrong...');
      return;
    }
    setShowMessage(true);
  };
  const closeMessage = async () => {
    setShowMessage(false);
    await router.push('/auth/sign-in');
  };
  return (
    <>
      <Head>
        <title>Изменить пароль | Куллайдер</title>
      </Head>
      <div className={styles.page}>
        <Form onSubmit={changePassword} style={{ maxWidth: '400px' }}>
          <div className={styles.logoOuter}>
            <img className={styles.logo} src="/big-logo.svg" alt="logo" />
          </div>
          <div className={styles.inputOuter}>
            <Textfield showPassword type="password" onInput={handleInput} errors={errors.password} name="password" placeholder="Пароль" />
          </div>
          <div className={styles.inputOuter}>
            <Textfield showPassword type="password" onInput={handleInput} errors={errors.confirmPassword} name="confirmPassword" placeholder="Подтвердите пароль" />
          </div>
          <div className={styles.buttonOuter}>
            <Button processing={processing} disabled={!valid}>Изменить пароль</Button>
          </div>
        </Form>
      </div>
      <BigMessage showing={showMessage} onClose={closeMessage}>
        <span>
          Пароль успешно изменён!
        </span>
      </BigMessage>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.query.token) {
    return {
      notFound: true,
      props: {},
    };
  }
  return { props: {} };
};
