import { ChangeEvent, useEffect, useState } from 'react';
import { ValidationSchema } from './validation-schema.interface';

export function useForm(schema: ValidationSchema) {
  const defaultFieldsState = Object.keys(schema)
      .reduce<any>((acc, key) => ({ ...acc, [key]: null }), {});

  const [valid, setValid] = useState(false);
  const [values, setValues] = useState(defaultFieldsState);
  const [errors, setErrors] = useState({} as any);
  const [touches, setTouches] = useState({} as any);

  const handleInput = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
    setTouches({ ...touches, [name]: true });
  }
  const handleCheckbox = ({target: {name, checked}}: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: checked });
    setTouches({ ...touches, [name]: true });
  }
  const getErrors = (name: string): any => schema[name]
      .reduce((err, validator) => ({ ...err, ...validator(values[name])}), {});
  useEffect(() => {
    const err = Object.keys(schema).reduce((acc, name) => ({ ...acc, [name]: getErrors(name) }), {});
    const isValid = !Object.entries(err).filter(([_, error]) => !!Object.values(error as any).length).length;
    setValid(isValid);
    setErrors(err);
  }, [values]);

  return {
    handleInput,
    handleCheckbox,
    values,
    valid,
    errors,
    touches
  };
}
