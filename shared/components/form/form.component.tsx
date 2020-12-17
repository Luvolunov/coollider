import React from 'react';
import styles from './form.module.scss';

export type FormProps = {
  children?: any;
  [key: string]: any;
};

export default function Form({ children, ...props }: FormProps) {
  return (
    <form {...props} className={styles.form}>
      {children}
    </form>
  );
}
