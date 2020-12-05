import styles from "./index.module.scss";
export default function Button({text,access}){
    return(
        <button 
        type="button"
        className={`${styles.btn} ${access? styles.active : styles.inactive}`}
        >
         {text}   
        </button>
    )
}