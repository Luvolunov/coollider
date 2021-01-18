import Form from "../../shared/components/form/form.component"
import Input from "../../shared/components/input/input.component"
import Logo from "../../shared/components/logo/logo.component"
import { useForm } from "../../shared/hooks/useForm.hook"
import Link from "next/link"
import styles from "./sign-up.module.scss";
import { SignUpSchema } from "./sign-up.schema"
import Head from "next/head"
import Button from "../../shared/components/button/button.component"
// import { Checkbox } from "../../shared/components/checkbox/checkbox.component"

export default function SignUpPage() {
    const {
        handleInput,
        valid,
        fields
    } = useForm(SignUpSchema);
    console.log(fields);
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
            {Object.keys(fields).map(key => (
              <Input
              key={key}
              name={key}
              status={fields[key].status}
              placeholder={fields[key].placeholder}
              type={fields[key].type}
              onChange={handleInput}
              />
            ))}
            {/* <Checkbox name="agreement" onChange={handleCheckbox}>Я согласен с условиями пользования</Checkbox> */}
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


