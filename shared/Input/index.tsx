import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

export default function Input({type,checkData,valid,updateFormState})
{
   const [isActive,setActive] = useState(false); // по дефолту инпут неактивен
   const inputRef = useRef({value : ""});
    return(
        <label className={`${styles.label}`} >
            <input
            ref={inputRef} // связал инпут и стейт
            placeholder={type} // использую встроенный placeholder
            onBlur={() => {
                setActive(Boolean(inputRef.current.value));
                updateFormState(checkData(inputRef.current.value),type)
            } } // если в инпуте есть данные - он активен
            onFocus={() => setActive(true)}
            className={styles.input}
            />
            <small className={`${styles.title} ${ isActive ? styles.active : ""} ${valid ? styles.success : !valid && !!inputRef.current.value ? styles.error : ""} `} >{type}</small> 
            <span className={styles.line}></span>
        </label>
        
    )
}