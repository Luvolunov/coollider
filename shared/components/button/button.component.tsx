/* eslint-disable react/jsx-props-no-spreading,react/button-has-type */
import React, { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './button.module.scss';
import Spinner from '../spinner/spinner.component';

type ButtonProps = ButtonHTMLAttributes<any> & {
  processing?: boolean;
  mode?: 'regular' | 'big';
};

export default function Button({ children, processing, ...props }: ButtonProps) {
  const buttonClassName = classnames(styles.button, {
    [styles.processing]: processing,
    [styles.big]: props.mode === 'big',
  });
  return (
    <button {...props} className={buttonClassName}>
      {
        processing && <div className={styles.loading}><Spinner /></div>
      }
      {children}
    </button>
  );
}

Button.defaultProps = {
  processing: false,
  mode: 'regular'
};
