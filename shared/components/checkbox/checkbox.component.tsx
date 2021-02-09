import styles from "./checkbox.module.scss";
import { CheckboxProps } from "./checkbox.props";

export function Checkbox({ children, ...props }: CheckboxProps) {
    return(
        <label className={styles.label}>
            <input
                className={styles.checkbox}
                type="checkbox"
                {...props}
            />
            <span className={styles.text}>{children}</span>
        </label>
    )
} 
