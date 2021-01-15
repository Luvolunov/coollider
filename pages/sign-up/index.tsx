import Form from "../../shared/components/form/form.component"
import Input from "../../shared/components/input/input.component"
import Logo from "../../shared/components/logo/logo.component"
import { useForm } from "../../shared/hooks/useForm.hook"
import Link from "next/link"
import styles from "./sign-up.module.scss";
import { SignUpSchema } from "./sign-up.schema"
import Head from "next/head"
import Button from "../../shared/components/button/button.component"
import { Checkbox } from "../../shared/components/checkbox/checkbox.component"

export default function SignUpPage() {
    const {handleInput,handleCheckbox,valid,values} = useForm(SignUpSchema);
    console.log(values)
    return(
        <>
        <Head>
            <title>Зарегистрироваться в Coollider!</title>
        </Head>
        <main className={styles.page}>
        <Form style = {{maxWidth: '500px'}}>
            <Logo/>
            <br/>
            <br/>
            <Input placeholder="Имя" onChange={handleInput} name="firstName" />
            <br/>
            <Input placeholder="Фамилия" onChange={handleInput} name="lastName"/>
            <br/>
            <Input placeholder="Почта" onChange={handleInput} name="email" />
            <br />
            <Input placeholder="Пароль" type="password" onChange={handleInput} name="password" />
            <br />
            <Input type="date" onChange={handleInput} name="dateOfBith"/>
            <br />
            <Checkbox name="agreement" onChange={handleCheckbox}>Я согласен с условиями пользования</Checkbox>
            <br/>
            <br/>
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


