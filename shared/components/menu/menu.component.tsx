import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';
import styles from './menu.module.scss';

export default function Menu() {
  const notMobileItemClass = classnames(styles.menuItem, styles.notMobile);
  return (
    <aside className={styles.aside}>
      <div className={styles.topMenu}>
        <Link href="/courses">
          <div className={styles.menuItem}>
            <Image src="/icons/book.svg" width={38} height={38} alt="courses" />
          </div>
        </Link>
        <Link href="/courses">
          <div className={styles.menuItem}>
            <Image src="/icons/trophy.svg" width={38} height={38} alt="trophy" />
          </div>
        </Link>
        <Link href="/courses">
          <div className={styles.menuItem}>
            <Image src="/icons/backpack.svg" width={38} height={38} alt="trophy" />
          </div>
        </Link>
        <Link href="/courses">
          <div className={styles.menuItem}>
            <Image src="/icons/comment-alt-lines.svg" width={38} height={38} alt="news" />
          </div>
        </Link>
        <Link href="/courses">
          <div className={notMobileItemClass}>
            <Image src="/icons/user-secret.svg" width={38} height={38} alt="admin" />
          </div>
        </Link>
      </div>
      <div className={styles.bottomMenu}>
        <Link href="/settings">
          <div className={styles.menuItem}>
            <Image src="/icons/cog.svg" width={38} height={38} alt="settings" />
          </div>
        </Link>
        <Link href="/courses">
          <div className={notMobileItemClass}>
            <Image src="/icons/question-circle.svg" width={38} height={38} alt="faq" />
          </div>
        </Link>
      </div>
    </aside>
  );
}
