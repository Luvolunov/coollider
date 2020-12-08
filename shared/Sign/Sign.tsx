import styles from "./index.module.scss"; // конструкция встречается почти в каждом копмпоненте!
import produce from "immer"; // удобный способ использовать иммутабельность
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useEffect, useState } from "react";
import {InputData} from "../interface";



export default function Sign({fields} : {fields :Array<InputData>})
{
    const [fieldsState,updateForm] : [fieldsState : Array<InputData>,updateForm : Function] = useState(fields);
    const [access,setAccess] = useState(false);

	 useEffect(() => setAccess(fieldsState.every(({valid}) => valid)) // если каждое поле валидное - есть доступ
	 ,[fieldsState])

    return(
    <form className={styles.sign} noValidate action="">
        {/* <div>
            <img className={styles.image} src="/coollider.png" alt=""/>
        </div> */}
        {
            fieldsState.map(({type, checkData,valid}) => <Input
            type={type}
            checkData={checkData}
            key={type}
            valid={valid}
            updateFormState={(valid : boolean,inpType : string) =>  { 
                updateForm( // после блюра инпута 
                    produce(fieldsState,draft => draft
                        .map(input => input.type != inpType ? input : {...input,valid})
                    )
                )                
            }}      
            />)
        }
        <Button
        textContent="Войти"
        access={access}
        />
    </form>
    )
}