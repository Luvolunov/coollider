import React from 'react';
import Head from 'next/head';
import Form from '../../../shared/components/form/form.component';
import Textfield from '../../../shared/components/textfield/textfield.component';
import styles from './forgot-password.module.scss';
import Button from '../../../shared/components/button/button.component';

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>Сбросить пароль | Куллайдер</title>
      </Head>
      <div className={styles.page}>
        <Form style={{ maxWidth: '400px' }}>
          <div className={styles.logoOuter}>
            <img className={styles.logo} src="/big-logo.svg" alt="logo" />
          </div>
          <div className={styles.inputOuter}>
            <Textfield placeholder="Почта" />
          </div>
          <div className={styles.buttonOuter}>
            <Button type="button">Сбросить пароль</Button>
          </div>
        </Form>
      </div>
    </>
  );
}
