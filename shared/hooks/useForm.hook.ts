import { ChangeEvent, useEffect, useState } from 'react';
import { ValidationSchema } from './validation-schema.interface';

export function useForm(schema: ValidationSchema) {
  const reducedSchema = Object.keys(schema)
      .reduce<any>((acc, key) => ({ ...acc, [key]: null }), {});
  const [valid, setValid] = useState(false);
  const [values, setValues] = useState(reducedSchema);
  const handleInput = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleCheckbox = ({ target: { name, checked } }: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: checked,
    });
  };

  useEffect(() => {
    const valid = Object.keys(schema)
      .every((name) => (!schema[name].validators?.length
        ? true
        : schema[name].validators?.every((validator) => validator(values[name]))));
    setValid(valid);
  }, [values]);

  return {
    handleCheckbox,
    handleInput,
    values,
    valid,
  };
}
