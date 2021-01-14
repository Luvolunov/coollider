import  { useState, FocusEvent } from 'react';
import styles from './input.module.scss';
import classNames from "classnames";
import {InputProps} from "../../props/input.props";

export default function Input({
placeholder, onFocus, onBlur, ...props
}: InputProps) {
  const [active, setActive] = useState(false);
  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
    setActive(true);
    onFocus && onFocus(event);
  };
  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    setActive(!!event.target.value);
    onBlur && onBlur(event);
  };
  const labelClasses = classNames(styles.label, { [styles.active]: active });
  return (
    <label className={labelClasses}>
      <small className={styles.small}>{placeholder}</small>
      <input
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        type="text"
        className={styles.input}
        autoComplete="new-password"
        {...props}
      />
      <span className={styles.placeholder}>{placeholder}</span>
      <span className={styles.line} />
    </label>
  );
}
