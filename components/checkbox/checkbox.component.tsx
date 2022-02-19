/* eslint-disable react/jsx-props-no-spreading,jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './checkbox.module.scss';
import { CheckboxProps } from './checkbox.props';

export default function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <label className={styles.label}>
      <input
        className={styles.checkbox}
        type="checkbox"
        {...props}
      />
      <span className={styles.text}>{children}</span>
    </label>
  );
}
