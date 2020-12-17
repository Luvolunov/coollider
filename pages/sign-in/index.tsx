import React from 'react';
import Head from 'next/head';
import Form from "../../shared/components/form/form.component";
import Input from "../../shared/components/input/input.component";
import Logo from "../../shared/components/logo/logo.component";
import styles from './sign-in.module.scss';

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Войти в Coollider!</title>
      </Head>
      <main className={styles.page}>
        <Form style={{ maxWidth: '500px' }}>
			<Logo />
			<br />
			<br />
			<Input placeholder="Email" />
			<br />
			<Input placeholder="Password" type="password" />
		</Form>
      </main>
    </>
  );
}
