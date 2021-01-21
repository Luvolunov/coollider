import { ChangeEvent, useEffect, useState, FocusEvent } from 'react';
import { ValidationSchema, Validator } from './validation-schema.interface';

export function useForm(schema: ValidationSchema) {
  const defaultFieldsState = Object.keys(schema)
      .reduce<any>((acc, key) => ({ ...acc, [key]: null }), {});

  const [valid, setValid] = useState(false);
  const [values, setValues] = useState(defaultFieldsState);
  const [errors, setErrors] = useState({} as any);
  const [touches, setTouches] = useState({} as any);

  const handleInput = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
  }
  const handleCheckbox = ({target: {name, checked}}: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: checked });
  }
  const handleFocus = ({ target: {name} }: FocusEvent<HTMLInputElement>) => {
    setTouches({ ...touches, [name]: true });
  }

  // const getErrors = (name: string): any => schema[name]
  //     .reduce((err, validator) => ({ ...err, ...validator(values[name])}), {});

  const getErrors = (name : string) => schema[name]
    .reduce((allErrors: Array<string>,getError: Validator) => {
      const err = getError(values[name]); // сообщение об ошибки(string) или null
      return err && !!values[name] ? [...allErrors,err] : allErrors; // ошибка должна быть и инпут должен содержать значение
    },[])

  useEffect(() => {
    const err = Object.keys(schema).reduce((allErrors, name) => ({ ...allErrors, [name]: getErrors(name) }), {});
    const isValid = true; // описать условие валидности формы
    setValid(isValid);
    setErrors(err);
  }, [values]);

  return {
    handleInput,
    handleCheckbox,
    handleFocus,
    values,
    valid,
    errors,
    touches
  };
}
