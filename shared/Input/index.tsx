import { useEffect, useState } from "react";
import styles from "./index.module.scss";

export default function Input({placeholder})
{
    const [isActive,setActive] = useState(false); // по дефолту инпут неактивен
    const [value,setValue] = useState(""); // по дефотку значение инпута - пустая строка

    useEffect(() => {
    },[isActive])

    return(
        <label className={`${styles.label}`} >
            <input
            placeholder={placeholder}
            onBlur={() => setActive(false)}
            onFocus={() => setActive(true)}
            onChange={e => setValue(e.target.value)}
            className={styles.input}
            />
            {/* решил использовать нативный placeholder инпута */}
            <small className={`${styles.title} ${!isActive && value ? styles.active : ""}`} >{placeholder}</small> 
            <span className={styles.line}></span>
        </label>
    )
}