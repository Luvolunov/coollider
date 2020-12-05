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
            onBlur={() => setActive(false)}
            onFocus={() => setActive(true)}
            className={styles.input}
            />
            {/* решил использовать нативный placeholder инпута */}
            <small className={`${styles.title} ${ inputRef.current.value ? styles.active : ""}`} >{placeholder}</small> 
            <span className={styles.line}></span>
        </label>
    )
}