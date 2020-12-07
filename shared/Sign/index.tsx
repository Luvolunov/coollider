import styles from "./index.module.scss"; // конструкция встречается почти в каждом копмпоненте!
import produce from "immer"; // удобный способ использовать иммутабельность
import Button from "../Button";
import Input from "../Input";
import { useEffect, useState } from "react";
import { checkEmail, checkName, checkPassword } from "./check";



export default function Sign({})
{
    const [fields,updateForm] = useState([
        {
            type: "Name",
            checkData: checkName,
            valid: false
        },
        {
            type: "Email",
            checkData: checkEmail,
            valid: false
        },
        {
            type: "Password",
            checkData : checkPassword,
            valid: false
        },
    ]);
    const [access,setAccess] = useState(false);

    useEffect(() => setAccess(
        fields.every(({valid}) => valid)
    ),[fields])

    return(
    <form className={styles.sign} noValidate action="">
        <div>
            <img className={styles.image} src="/coollider.png" alt=""/>
        </div>
        {
            fields.map(({type, checkData,valid}) => 
            <Input
            type={type}
            checkData={checkData}
            key={type}
            isValid={valid}
            updateFormState={(valid : boolean,inpType : string) =>  {
                updateForm( // после блюра инпута 
                    produce(fields,draft => draft
                        .map(input => input.type != inpType ? input : {...input,valid})
                    )
                )                
            }}      
            />)
        }
        <Button
        text="Войти"
        access={access}
        />
    </form>
    )
}