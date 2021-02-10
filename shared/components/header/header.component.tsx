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
                <Image src="/icons/user-circle.svg" width={45} height={45} alt="user" />
            </div>
            <nav ref={menuRef} className={menuClass}>
                <div className={styles.menuInner}>
                    <div className={styles.name}>Майкл Джексон</div>
                    <div className={styles.menuItem}>
                        <Image src="/icons/user.svg" width={18} height={18} alt="profile" />
                        <span className={styles.menuText}>Профиль</span>
                    </div>
                    <div className={styles.menuItem}>
                        <Image src="/icons/star.svg" width={18} height={18} alt="achievements" />
                        <span className={styles.menuText}>Достижения</span>
                    </div>
                    <div className={styles.menuItem}>
                        <Image src="/icons/chart-pie.svg" width={18} height={18} alt="statistics" />
                        <span className={styles.menuText}>Статистика</span>
                    </div>
                    <div className={styles.exit}>
                        <Image src="/icons/door-closed.svg" width={18} height={18} alt="exit" />
                        <span className={styles.menuText}>Выйти</span>
                    </div>
                </div>
            </nav>
        </header>
    )
}