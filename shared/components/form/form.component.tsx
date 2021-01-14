import React from 'react';
import styles from './form.module.scss';
import {FormProps} from "../../props/form.props";


export default function Form({ children, ...props }: FormProps) {
  return (
    <form {...props} className={styles.form}>
      {children}
    </form>
  );
}
