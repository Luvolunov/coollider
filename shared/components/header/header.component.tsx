import styles from "./header.module.scss";
import Image from 'next/image';
import {useEffect, useState, useRef} from "react";
import classnames from 'classnames';

export default function Header(){
    const [openedMenu, setOpenedMenu] = useState(false);
    const menuClass = classnames(styles.menu, { [styles.open]: openedMenu });
    const menuRef = useRef<any>(null);
    useEffect(() => {
        const handleOutsideClick = (event: Event) => {
            if (!openedMenu) { return; }
            if (menuRef.current.contains(event.target)) { return; }
            setOpenedMenu(false);
        }
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    });
    return(
        <header className={styles.header}>
            <h1 className={styles.title}>Курсы</h1>
            <div onClick={() => setOpenedMenu(!openedMenu)} className={styles.userInfo}>
                <span className={styles.name}>Имя Фамилия</span>
                <Image src="/user-icon.svg" width={45} height={45} alt="user" />
            </div>
            <nav ref={menuRef} className={menuClass}>
                <div className={styles.menuInner}/>
            </nav>
        </header>
    )
}