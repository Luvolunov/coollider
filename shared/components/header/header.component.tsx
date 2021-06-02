/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import styles from './header.module.scss';
import UserAPI from '../../api/user.api';
import { $titleStore } from '../../../store/title';

export default function Header() {
  const titleStore = useStore($titleStore);
  const router = useRouter();
  const { data } = UserAPI.current();
  const [openedMenu, setOpenedMenu] = useState(false);
  const menuClass = classnames(styles.menu, { [styles.open]: openedMenu });
  const menuRef = useRef<any>(null);
  const username = `${data?.firstName} ${data?.lastName}`;
  const logout = async () => {
    await fetch('/api/auth/sign-out', {
      method: 'POST',
      credentials: 'include',
    });
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
            <Link href="/profile">
              <a onClick={() => setOpenedMenu(false)} className={styles.menuItem}>
                <Image src="/icons/user.svg" width={18} height={18} alt="profile" />
                <span className={styles.menuText}>Профиль</span>
              </a>
            </Link>
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
