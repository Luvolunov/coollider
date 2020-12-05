import styles from "./index.module.scss"; // конструкция встречается почти в каждом копмпоненте!
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";
import { checkEmail, checkName, checkPassword } from "./check";

export default function Sign({})
{
    const [fields,setFields] = useState([
        {
            type: "Name",
                checkData: checkName
        },
        {
            type: "Email",
            checkData: checkEmail
        },
        {
            type: "Password",
            checkData : checkPassword
        },
    ])
    return(
    <form className={styles.sign} noValidate action="">
        {
            fields.map(({type, checkData}) => <Input
            type={type}
            checkData={checkData}
            key={type}
            />)
        }
        <Button text="Войти"/>
    </form>
    )
}