/* eslint-disable react/jsx-one-expression-per-line,max-len */
import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Form from '../../../components/form/form.component';
import Textfield from '../../../components/textfield/textfield.component';
import styles from './forgot-password.module.scss';
import Button from '../../../components/button/button.component';
import { useForm } from '../../../shared/hooks/useForm.hook';
import { ForgotPasswordSchema } from '../../../shared/schemas/forgot-password.schema';
import { ApiResponse } from '../../../shared/types/api-response.interface';
import BigMessage from '../../../components/big-message/big-message.component';

export default function ForgotPassword() {
  const {
    handleInput, valid, errors, values,
  } = useForm(ForgotPasswordSchema);
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const resetPassword = async (event: FormEvent) => {
    event.preventDefault();
    if (!valid) { return; }
    setProcessing(true);
    const body = {
      email: values.email.trim(),
    };
    const res = await fetch('/api/auth/forgot-password', {
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
        <title>Сбросить пароль | Куллайдер</title>
      </Head>
      <div className={styles.page}>
        <Form onSubmit={resetPassword} style={{ maxWidth: '400px' }}>
          <div className={styles.logoOuter}>
            <img className={styles.logo} src="/big-logo.svg" alt="logo" />
          </div>
          <div className={styles.inputOuter}>
            <Textfield onInput={handleInput} errors={errors.email} name="email" placeholder="Почта" />
          </div>
          <div className={styles.buttonOuter}>
            <Button processing={processing} disabled={!valid}>Сбросить пароль</Button>
          </div>
        </Form>
      </div>
      <BigMessage showing={showMessage} onClose={closeMessage}>
        <span className={styles.bigMessage}>
          На почту <b>{values.email}</b> отправлено письмо с дальнейшими инструкциями по сбросу пароля!
        </span>
      </BigMessage>
    </>
  );
}
