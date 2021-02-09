import {useState, FocusEvent, ChangeEvent} from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';
import {InputProps} from './input.props';

export default function Input({
    placeholder, onFocus, onBlur, errors = [], onChange, ...props
}: InputProps) {

  const [active, setActive] = useState(false);
  const [touched, setTouched] = useState(false);

  const error = errors.length ? errors[0] : null;

  const labelClasses = classNames(styles.label, { [styles.active]: active });
  const inputClasses = classNames(styles.input, {[styles.error]: error && touched });

  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
    setActive(true);
    setTouched(true);
    onFocus && onFocus(event);
  };
  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    setActive(!!event.target.value);
    onBlur && onBlur(event);
  };
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setActive(true);
      onChange && onChange(event);
  }

  return (
    <label className={labelClasses}>
      <small className={styles.small}>{placeholder}</small>
      <input
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        autoComplete="new-password"
        className={inputClasses}
        {...props}
      />
      <span className={styles.placeholder}>{placeholder}</span>
      <span className={styles.line} />
      <span className={styles.hint}>{touched ? error : null}</span>
    </label>
  );
}
