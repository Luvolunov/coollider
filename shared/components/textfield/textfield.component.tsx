/* eslint-disable @typescript-eslint/no-unused-expressions,
react/jsx-props-no-spreading,jsx-a11y/label-has-associated-control */
import React, {
  useState, FocusEvent, ChangeEvent, useRef, useEffect,
} from 'react';
import classNames from 'classnames';
import autosize from 'autosize';
import styles from './textfield.module.scss';
import { InputField, TextareaField } from './textfield.props';

export default function Textfield({
  placeholder, onFocus, onBlur, errors = [], onChange, fieldType = 'input', ...props
}: TextareaField | InputField) {
  const [active, setActive] = useState(!!props.value);
  const [touched, setTouched] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const error = errors.length ? errors[0] : null;

  const labelClasses = classNames(styles.label, { [styles.active]: active });
  const inputClasses = classNames(styles.textfield, { [styles.error]: error && touched });

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
  };

  useEffect(() => {
    if (fieldType !== 'textarea') { return; }
    autosize(textareaRef.current!);
  }, [props.value]);

  return (
    <label className={labelClasses}>
      <small className={styles.small}>{placeholder}</small>
      {
        fieldType === 'input' && (
          <input
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={props.value}
            autoComplete="off"
            className={inputClasses}
            {...props as InputField}
          />
        )
      }
      {
        fieldType === 'textarea' && (
          <textarea
            ref={textareaRef}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            value={props.value}
            rows={1}
            className={inputClasses}
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
