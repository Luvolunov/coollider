import { HeaderProps } from "../props/header.props";
import styles from "./header.module.scss";
export default function Header({children} : HeaderProps){
    return(
        <header className={styles.header}>
            {children}
        </header>
    )
}