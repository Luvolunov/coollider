/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './menu.module.scss';

export default function Menu() {
  return (
    <nav className={styles.menu}>
      <div className={styles.firstMenu}>
        <Link href="/courses">
          <a className={styles.menuItem}>
            <Image width={25} height={29} src="/icons/book.svg" />
            <span className={styles.menuItemTitle}>Курсы</span>
          </a>
        </Link>
        <Link href="/statistics">
          <a className={styles.menuItem}>
            <Image width={25} height={29} src="/icons/stats.svg" />
            <span className={styles.menuItemTitle}>Статистика</span>
          </a>
        </Link>
        <Link href="/news">
          <a className={styles.menuItem}>
            <Image width={25} height={29} src="/icons/news.svg" />
            <span className={styles.menuItemTitle}>Новости</span>
          </a>
        </Link>
        <Link href="/admin">
          <a className={styles.menuItem}>
            <Image width={25} height={29} src="/icons/admin.svg" />
            <span className={styles.menuItemTitle}>Админка</span>
          </a>
        </Link>
      </div>
      <div className={styles.secondMenu}>
        <Link href="/settings">
          <a className={styles.menuItem}>
            <Image width={25} height={29} src="/icons/cog.svg" />
            <span className={styles.menuItemTitle}>Настройки</span>
          </a>
        </Link>
        <Link href="/faq">
          <a className={styles.menuItem}>
            <Image width={25} height={29} src="/icons/question-circle.svg" />
            <span className={styles.menuItemTitle}>Вопросы</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}
