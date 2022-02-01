import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Form from '../../../shared/components/form/form.component';
import Textfield from '../../../shared/components/textfield/textfield.component';
import styles from './forgot-password.module.scss';
import Button from '../../../shared/components/button/button.component';
import { useForm } from '../../../shared/hooks/useForm.hook';
import { ForgotPasswordSchema } from '../../../shared/schemas/forgot-password.schema';
import { ApiResponse } from '../../../shared/types/api-response.interface';

export default function ForgotPassword() {
  const {
    handleInput, valid, errors, values,
  } = useForm(ForgotPasswordSchema);
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const resetPassword = async (event: FormEvent) => {
    event.preventDefault();
    if (!valid) { return; }
    setProcessing(true);
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(values),
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
    alert('Письмо для сброса пароля отправлено на почту!');
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
    </>
  );
}
