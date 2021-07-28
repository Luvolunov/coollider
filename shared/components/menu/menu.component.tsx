/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import styles from './menu.module.scss';
import RoleGuard from '../role-guard/role-guard.component';

export default function Menu() {
  const router = useRouter();
  const checkActiveLink = (path: string) => router.asPath === path;
  const notMobileClasses = (path: string) => classnames(styles.menuItem, styles.notMobile, {
    [styles.active]: checkActiveLink(path),
  });
  const linkClasses = (path: string) => classnames(styles.menuItem, {
    [styles.active]: checkActiveLink(path),
  });
  return (
    <nav className={styles.menu}>
      <div className={styles.firstMenu}>
        <Link href="/courses">
          <a className={linkClasses('/courses')}>
            <Image
              className={styles.menuItemImage}
              width={25}
              height={29}
              src={`/menu-icons/book${checkActiveLink('/courses') ? '-active' : ''}.svg`}
            />
            <span className={styles.menuItemTitle}>Курсы</span>
          </a>
        </Link>
        <Link href="/statistics">
          <a className={linkClasses('/statistics')}>
            <Image
              className={styles.menuItemImage}
              width={25}
              height={29}
              src={`/menu-icons/stats${checkActiveLink('/statistics') ? '-active' : ''}.svg`}
            />
            <span className={styles.menuItemTitle}>Статистика</span>
          </a>
        </Link>
        <Link href="/news">
          <a className={linkClasses('/news')}>
            <Image
              className={styles.menuItemImage}
              width={25}
              height={29}
              src={`/menu-icons/news${checkActiveLink('/news') ? '-active' : ''}.svg`}
            />
            <span className={styles.menuItemTitle}>Новости</span>
          </a>
        </Link>
        <RoleGuard someRoles={['Admin', 'Superuser']}>
          <Link href="/admin">
            <a className={notMobileClasses('/admin')}>
              <Image
                className={styles.menuItemImage}
                width={25}
                height={29}
                src={`/menu-icons/admin${checkActiveLink('/admin') ? '-active' : ''}.svg`}
              />
              <span className={styles.menuItemTitle}>Админка</span>
            </a>
          </Link>
        </RoleGuard>
      </div>
      <div className={styles.secondMenu}>
        <Link href="/settings">
          <a className={linkClasses('/settings')}>
            <Image
              className={styles.menuItemImage}
              width={25}
              height={29}
              src={`/menu-icons/cog${checkActiveLink('/settings') ? '-active' : ''}.svg`}
            />
            <span className={styles.menuItemTitle}>Настройки</span>
          </a>
        </Link>
        <Link href="/faq">
          <a className={notMobileClasses('/faq')}>
            <Image
              className={styles.menuItemImage}
              width={25}
              height={29}
              src={`/menu-icons/question-circle${checkActiveLink('/faq') ? '-active' : ''}.svg`}
            />
            <span className={styles.menuItemTitle}>Вопросы</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}
