/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './menu.module.scss';
import classnames from 'classnames';
import RoleGuard from '../role-guard/role-guard.component';

export default function Menu() {
  const notMobileClasses = classnames(styles.menuItem, styles.notMobile);
  return (
    <nav className={styles.menu}>
      <div className={styles.firstMenu}>
        <Link href="/courses">
          <a className={styles.menuItem}>
            <Image className={styles.menuItemImage} width={25} height={29} src="/icons/book.svg" />
            <span className={styles.menuItemTitle}>Курсы</span>
          </a>
        </Link>
        <Link href="/statistics">
          <a className={styles.menuItem}>
            <Image className={styles.menuItemImage} width={25} height={29} src="/icons/stats.svg" />
            <span className={styles.menuItemTitle}>Статистика</span>
          </a>
        </Link>
        <Link href="/news">
          <a className={styles.menuItem}>
            <Image className={styles.menuItemImage} width={25} height={29} src="/icons/news.svg" />
            <span className={styles.menuItemTitle}>Новости</span>
          </a>
        </Link>
        <RoleGuard someRoles={['Admin', 'Superuser']}>
          <Link href="/admin">
            <a className={notMobileClasses}>
              <Image className={styles.menuItemImage} width={25} height={29} src="/icons/admin.svg" />
              <span className={styles.menuItemTitle}>Админка</span>
            </a>
          </Link>
        </RoleGuard>
      </div>
      <div className={styles.secondMenu}>
        <Link href="/settings">
          <a className={styles.menuItem}>
            <Image className={styles.menuItemImage} width={25} height={29} src="/icons/cog.svg" />
            <span className={styles.menuItemTitle}>Настройки</span>
          </a>
        </Link>
        <Link href="/faq">
          <a className={notMobileClasses}>
            <Image className={styles.menuItemImage} width={25} height={29} src="/icons/question-circle.svg" />
            <span className={styles.menuItemTitle}>Вопросы</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}
