import { useRef, useState } from "react";
import styles from "./index.module.scss";
import {InputData} from "../interface";

export default function Input({minLen = 4,maxLen = 64,type,checkData,valid,updateFormState} : InputData)
{
   const [isActive,setActive] : [isActive : boolean,setActive:Function] = useState(false); // по дефолту инпут неактивен
   const inputRef = useRef({value: ""}); // какой тут тип?
    return(
        <label className={`${styles.label}`} >
            <input
            ref={inputRef} // почему ругается?
            placeholder={type} // использую встроенный placeholder
            onBlur={() => {
                setActive(Boolean(inputRef.current.value));
					 updateFormState(checkData(inputRef.current.value,inputRef.current.value.length,minLen),type) // один интерфейс на два похожих объекта
            } } // если в инпуте есть данные - он активен
				onFocus={() => setActive(true)}
				minLength={minLen}
				maxLength={maxLen}
            className={styles.input}
            />
            <small className={`${styles.title} ${ isActive ? styles.active : ""} ${valid ? styles.success : !valid && !!inputRef.current.value ? styles.error : ""} `} >{type}</small> 
            <span className={styles.line}></span>
        </label>
        
    )
}