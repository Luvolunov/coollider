import styles from "./index.module.scss"; // конструкция встречается почти в каждом копмпоненте!
import produce from "immer"; // удобный способ использовать иммутабельность
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useEffect, useState } from "react";
import {InputData,SignLink} from "../interface";
import ChangeSign from "../ChangeSign/ChangeSign";
import { useFormik } from "formik";
import { validationSchema } from "./check";
// let schema = Yup.object().shape({
//     name: Yup.string().required(),
//     age: Yup.number().required(),
//     email: Yup.string().email()
// })

interface SignData {
    fields: Array <InputData>,
    changeForm: SignLink
}
export default function Sign({fields,changeForm} : SignData)
{
    const [fieldsState,updateForm] : [fieldsState : Array<InputData>,updateForm : Function] = useState(fields);
	 const [access,setAccess] = useState(false);
 
	 useEffect(() => setAccess(fieldsState.every(({valid}) => valid)) // если каждое поле валидное - есть доступ
	 ,[fieldsState])

    return(
		<div  className={styles.wrapper}>
			<div>
		<img className={styles.image} src="/coollider.png" alt="Coollider"/>
  		</div>
    <form className={styles.sign} noValidate action=""> 
        {
            fieldsState.map(({type, checkData,valid}) => <Input
            type={type}
            checkData={checkData}
            key={type}
            valid={valid}
            updateFormState={(valid : boolean,inpType : string ) =>  { // обновление стейта формы 
                updateForm( // после блюра инпута 
                    produce(fieldsState,draft => draft // draft - копия состояния формы
                        .map((input) : InputData => input.type != inpType ? input : {...input,valid}) // если поймали изменяемый инпут - обновляем свойство valid
                    )
                )                
            }}      
            />)
        }
        <Button
		  type="submit"
        textContent="Войти"
		  access={access}
        />
		  <div>
		  <ChangeSign
		  href={changeForm.href}
		  textContent={changeForm.textContent}
		  />
		  </div>
    </form>
		</div>
    )
}