import React from 'react';
import Head from 'next/head';
import Form from "../../shared/components/form/form.component";
import Input from "../../shared/components/input/input.component";
import Logo from "../../shared/components/logo/logo.component";
import styles from './sign-in.module.scss';
import Button from "../../shared/components/button/button.component";
import Link from 'next/link';
import {useForm} from "../../shared/hooks/useForm.hook";
import {SignInSchema} from "./sign-in.schema";

export default function SignInPage() {
	const { handleInput, valid } = useForm(SignInSchema);
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
					<Input placeholder="Почта" onChange={handleInput} name="email" />
					<br />
					<Input placeholder="Пароль" type="password" onChange={handleInput} name="password" />
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
