import  { useState, FocusEvent } from 'react';
import styles from './input.module.scss';
import classNames from "classnames";
import {InputProps} from "./input.props";
// error
export default function Input({
    placeholder, onFocus, onBlur, errors = [], touch, ...props
}: InputProps) {
  const [active, setActive] = useState(false);

  const error: string | null = errors.length ? errors[0] : null; // выдергиваю первую ошибку или null, если ошибок нет
  
  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
    setActive(true);
    onFocus && onFocus(event);
  };
  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    setActive(!!event.target.value);
    onBlur && onBlur(event);
  };

  const labelClasses = classNames(styles.label, { [styles.active]: active });
  const inputClasses = classNames(styles.input, {[styles.error]: error})

  return (
    <label className={labelClasses}>
      <small className={styles.small}>{placeholder}</small>
      <input
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        autoComplete="new-password"
        className={inputClasses}
        {...props}
      />
      <span className={styles.placeholder}>{placeholder}</span>
      <span className={styles.line} />
      <span className={styles.hint}>{error}</span>
    </label>
  );
}
