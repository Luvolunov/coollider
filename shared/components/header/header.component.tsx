/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import styles from './header.module.scss';
import UserAPI from '../../api/user.api';
import { useStore } from 'effector-react';
import { title } from '../../../store/title';

export default function Header() {
  const titleStore = useStore(title);
  const router = useRouter();
  const { data, revalidate } = UserAPI.current();
  const [openedMenu, setOpenedMenu] = useState(false);
  const menuClass = classnames(styles.menu, { [styles.open]: openedMenu });
  const menuRef = useRef<any>(null);
  const username = `${data?.body?.firstName} ${data?.body?.lastName}`;
  const logout = async () => {
    await fetch('/api/auth/sign-out', {
      method: 'POST',
      credentials: 'include',
    });
    await revalidate();
    await router.push('/auth/sign-in');
  };
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (!openedMenu || !menuRef.current) { return; }
      if (menuRef.current.contains(event.target)) { return; }
      setOpenedMenu(false);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  });
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <h1 className={styles.title}>{titleStore}</h1>
        <div onClick={() => setOpenedMenu(!openedMenu)} className={styles.userInfo}>
          <Image src="/icons/user-circle.svg" width={45} height={45} alt="user" />
        </div>
        <nav ref={menuRef} className={menuClass}>
          <div className={styles.menuInner}>
            <div className={styles.name}>{username}</div>
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
            <div onClick={logout} className={styles.exit}>
              <Image src="/icons/door-closed.svg" width={18} height={18} alt="exit" />
              <span className={styles.menuText}>Выйти</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
