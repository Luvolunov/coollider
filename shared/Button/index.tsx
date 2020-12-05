import styles from "./index.module.scss";
export default function Button({text}){
    return(
        <button 
        type="button"
        className={`${styles.btn} ${styles.active}`}
        >
         {text}   
        </button>
    )
}