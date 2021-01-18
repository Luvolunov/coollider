import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Form from '../../shared/components/form/form.component';
import Input from '../../shared/components/input/input.component';
import Logo from '../../shared/components/logo/logo.component';
import styles from './sign-in.module.scss';
import Button from '../../shared/components/button/button.component';
import { useForm } from '../../shared/hooks/useForm.hook';
import { SignInSchema } from './sign-in.schema';
import Header from '../../shared/components/header/header.component';
import Menu from '../../shared/components/menu/menu.component';

export default function SignInPage() {
  const { handleInput, valid, values, errors, touches } = useForm(SignInSchema);
  console.log(values);
  return (
    <>
      <Head>
        <title>Войти в Coollider!</title>
      </Head>
      <Header></Header>
      <Menu></Menu>
      <main className={styles.page}>
        <Form style={{ maxWidth: '500px' }}>
          <Logo />
          <br />
          <br />
          <Input placeholder="Почта" onChange={handleInput} name="email" />
          {
            errors.email?.isEmail && touches.email
              ? <small className="error-hint">Почта некорректна!</small>
              : null
          }
          <br />
          <Input placeholder="Пароль" type="password" onChange={handleInput} name="password" />
          {
            errors.password?.minLength && touches.minLength
                ? <small className="error-hint">Пароль должен быть больше 7 символов!</small>
                : null
          }
          <br />
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button type="button" disabled={!valid}>Войти</Button>
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/sign-up">
              <a>У меня нет аккаунта :(</a>
            </Link>
          </div>
        </Form>
      </main>
    </>
  );
}
