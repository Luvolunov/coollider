/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './form.module.scss';
import { FormProps } from './form.props';

export default function Form({ children, ...props }: FormProps) {
  return (
    <form {...props} className={styles.form}>
      {children}
    </form>
  );
}
