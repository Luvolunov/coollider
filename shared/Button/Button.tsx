import styles from "./index.module.scss";
export default function Button({textContent,access,type = "button"} : {textContent : string, access : boolean,type: any}){
    return(
        <button 
        type={type}
        className={`${styles.btn} ${access? styles.active : styles.inactive}`}
        >
        {textContent}   
        </button>
    )
}