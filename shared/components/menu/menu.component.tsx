import styles from './menu.module.scss';
import Image from 'next/image';
import classnames from 'classnames';

export default function Menu(){
    const notMobileItemClass = classnames(styles.menuItem, styles.notMobile);
    return(
        <aside className={styles.aside}>
            <div className={styles.topMenu}>
                <div className={styles.menuItem}>
                    <Image src="/icons/book.svg" width={38} height={38} alt="courses" />
                </div>
                <div className={styles.menuItem}>
                    <Image src="/icons/trophy.svg" width={38} height={38} alt="trophy" />
                </div>
                <div className={styles.menuItem}>
                    <Image src="/icons/backpack.svg" width={38} height={38} alt="trophy" />
                </div>
                <div className={styles.menuItem}>
                    <Image src="/icons/comment-alt-lines.svg" width={38} height={38} alt="news" />
                </div>
                <div className={notMobileItemClass}>
                    <Image src="/icons/user-secret.svg" width={38} height={38} alt="admin" />
                </div>
            </div>
            <div className={styles.bottomMenu}>
                <div className={styles.menuItem}>
                    <Image src="/icons/cog.svg" width={38} height={38} alt="settings" />
                </div>
                <div className={notMobileItemClass}>
                    <Image src="/icons/question-circle.svg" width={38} height={38} alt="faq" />
                </div>
            </div>
        </aside>
    )
}