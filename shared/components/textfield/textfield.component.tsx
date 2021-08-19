/* eslint-disable @typescript-eslint/no-unused-expressions,
react/jsx-props-no-spreading,jsx-a11y/label-has-associated-control */
import React, { useState, FocusEvent, ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './textfield.module.scss';
import { InputField, TextareaField } from './textfield.props';

export default function Textfield({
  placeholder, onFocus, onBlur, errors = [], onChange, fieldType = 'input', ...props
}: TextareaField | InputField) {
  const [active, setActive] = useState(!!props.value);
  const [touched, setTouched] = useState(false);
  const [rows, setRows] = useState(((props.value as string)?.match(/\n/gi)?.length || 0) + 1);

  const error = errors.length ? errors[0] : null;

  const labelClasses = classNames(styles.label, { [styles.active]: active });
  const inputClasses = classNames(styles.input, { [styles.error]: error && touched });

  const handleOnFocus = (event: FocusEvent<any>) => {
    setActive(true);
    onFocus && onFocus(event);
  };
  const handleOnBlur = (event: FocusEvent<any>) => {
    setActive(!!event.target.value);
    setTouched(true);
    onBlur && onBlur(event);
  };
  const handleOnChange = (event: ChangeEvent<any>) => {
    setActive(true);
    setTouched(true);
    onChange && onChange(event);
    if (fieldType === 'textarea') {
      setRows((event.target.value.match(/\n/gi)?.length || 0) + 1);
    }
  };

  return (
    <label className={labelClasses}>
      <small className={styles.small}>{placeholder}</small>
      {
        fieldType === 'input' && (
          <input
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            autoComplete="off"
            className={inputClasses}
            {...props as InputField}
          />
        )
      }
      {
        fieldType === 'textarea' && (
          <textarea
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            className={inputClasses}
            rows={rows}
            {...props as TextareaField}
          />
        )
      }
      <span className={styles.placeholder}>{placeholder}</span>
      <span className={styles.line} />
      <span className={styles.hint}>{touched ? error : null}</span>
    </label>
  );
}
