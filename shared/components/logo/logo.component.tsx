import React from 'react';
import Image from 'next/image';
import styles from './logo.module.scss';

export default function Logo() {
  return <Image className={styles.logo} width={1972} height={1004} src="/coollider.png" alt="rocket" />;
}
