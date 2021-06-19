/* eslint-disable react/jsx-props-no-spreading,react/button-has-type */
import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

export default function Button({ children, ...props }: ButtonHTMLAttributes<any>) {
  return <button {...props} className={styles.button}>{children}</button>;
}
