import React from 'react';
import Head from 'next/head';
import Form from "../../shared/components/form/form.component";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Войти в Coollider!</title>
      </Head>
      <main>
        <Form style={{ maxWidth: '500px' }}>
			Form
		</Form>
      </main>
    </>
  );
}
