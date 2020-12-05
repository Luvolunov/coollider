import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

export default function Input({type,checkData})
{
   const [isActive,setActive] = useState(false); // по дефолту инпут неактивен
   const [isValid,setValid] = useState(false); // по дефолту инпут не валидный
   const inputRef = useRef({value : ""});

    useEffect(() => {
        if(isValid) console.log("Валидно!");
    },[isValid])

    return(
        <label className={`${styles.label}`} >
            <input
            ref={inputRef}
            placeholder={type} // использую встроенный placeholder
            onBlur={() => {
                setActive(Boolean(inputRef.current.value))
                setValid(checkData(inputRef.current.value))
            } } // если в инпуте есть данные - он активен
            onFocus={() => setActive(true)}
            className={styles.input}
            />
            <small className={`${styles.title} ${ isActive ? styles.active : ""} ${isValid ? styles.success : ""}`} >{type}</small> 
            <span className={styles.line}></span>
        </label>
        
    )
}