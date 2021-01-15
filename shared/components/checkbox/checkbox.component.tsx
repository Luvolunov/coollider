import styles from "./checkbox.module.scss";
import {CheckboxProps} from "../props/checkbox.props";

export function Checkbox(
    {condition,...props} : CheckboxProps) {
    return(
        <label className={styles.label}>
            <input
            className={styles.checkbox}
            type="checkbox"
            {...props}
            />
            <span className={styles.condition}>{condition}</span>
            <span className={styles.fake}></span>
        </label>
    )
} 
