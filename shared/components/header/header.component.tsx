import styles from "./header.module.scss";
import Image from 'next/image';

export default function Header(){
    return(
        <header className={styles.header}>
            <h1 className={styles.title}>Курсы</h1>
            <div className={styles.userInfo}>
                <span className={styles.name}>Имя Фамилия</span>
                <Image src="/user-icon.svg" width={45} height={45} alt="user" />
            </div>
        </header>
    )
}