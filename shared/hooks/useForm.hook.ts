import { ChangeEvent, useEffect, useState } from 'react';
import { ValidationSchema, Validator } from './validation-schema.interface';

export function useForm(schema: ValidationSchema, defaultValue: any = {}) {
  const defaultFieldsState = Object.keys(schema)
    .reduce<any>((acc, key) => ({ ...acc, [key]: defaultValue[key] }), {});

  const [valid, setValid] = useState(false);
  const [values, setValues] = useState(defaultFieldsState);
  const [errors, setErrors] = useState({} as any);

  const handleInput = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
  };
  const handleCheckbox = ({ target: { name, checked } }: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: checked });
  };

  const getErrors = (name : string) => schema[name]
    .reduce((allErrors: Array<string>, validate: Validator) => {
      const err = validate(values[name]);
      return err ? [...allErrors, err] : allErrors;
    }, []);

  useEffect(() => {
    const err = Object
      .keys(schema)
      .reduce((allErrors, name) => ({ ...allErrors, [name]: getErrors(name) }), {});
    const isValid = !Object.values<string[]>(err).filter((errs) => !!errs.length).length;
    setValid(isValid);
    setErrors(err);
  }, [values]);

  return {
    handleInput,
    handleCheckbox,
    values,
    valid,
    errors,
  };
}
