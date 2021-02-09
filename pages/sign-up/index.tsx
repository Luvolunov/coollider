import Form from "../../shared/components/form/form.component";
import Input from "../../shared/components/input/input.component";
import { useForm } from "../../shared/hooks/useForm.hook";
import Link from "next/link";
import styles from "./sign-up.module.scss";
import { SignUpSchema } from "../../shared/schemas/sign-up.schema";
import Head from "next/head";
import Button from "../../shared/components/button/button.component";
import { Checkbox } from "../../shared/components/checkbox/checkbox.component";

export default function SignUpPage() {
    const {
        handleInput,
        handleCheckbox,
        valid,
        handleFocus,
        errors
    } = useForm(SignUpSchema);
    return(
        <>
        <Head>
            <title>Зарегистрироваться в Coollider!</title>
        </Head>
        <main className={styles.page}>
            <Form style = {{ width: '100%', maxWidth: '450px'}}>
                <h5 style={{ textAlign: 'center' }}>Регистрация</h5>
                <br />
                <Input
                    name="firstName"
                    placeholder="Имя"
                    onChange={handleInput}
                    errors={errors.firstName}
                    onFocus={handleFocus}
                />
                <br />
                <Input
                    name="lastName"
                    placeholder="Фамилия"
                    onChange={handleInput}
                    errors={errors.lastName}
                    onFocus={handleFocus}
                />
                <br />
                <Input
                    name="email"
                    placeholder="Почта"
                    onChange={handleInput}
                    errors={errors.email}
                    onFocus={handleFocus}
                />
                <br />
                <Input
                    name="password"
                    placeholder="Пароль"
                    onChange={handleInput}
                    type="password"
                    errors={errors.password}
                    onFocus={handleFocus}
                />
                <br />
                <Checkbox name="agreement" onChange={handleCheckbox}>Я согласен с условиями пользования</Checkbox>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button type="button" disabled={!valid}>Зарегистрироваться</Button>
                </div>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link href="/sign-in">
                        <a>У меня есть аккаунт :)</a>
                    </Link>
                </div>
            </Form>
        </main>
        </>
    )
}


