import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

export default function Input({placeholder})
{
   const [isActive,setActive] = useState(false); // по дефолту инпут неактивен
   const inputRef = useRef({value : ""});
    return(
        <label className={`${styles.label}`} >
            <input
            ref={inputRef}
            placeholder={placeholder}
            onBlur={() => setActive(Boolean(inputRef.current.value))}
            onFocus={() => setActive(true) } // если в инпуте есть дата - он активен
            className={styles.input}
            />
            {/* решил использовать нативный placeholder инпута */}
            <small className={`${styles.title} ${ isActive ? styles.active : ""}`} >{placeholder}</small> 
            <span className={styles.line}></span>
        </label>
    )
}