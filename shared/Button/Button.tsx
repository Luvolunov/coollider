import styles from "./index.module.scss";
export default function Button({textContent,access} : {textContent : string, access : boolean}){
    return(
        <button 
        type="button"
        className={`${styles.btn} ${access? styles.active : styles.inactive}`}
        >
        {textContent}   
        </button>
    )
}