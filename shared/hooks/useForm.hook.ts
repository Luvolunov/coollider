import { ChangeEvent, useEffect, useState } from 'react';
import { ValidationSchema } from './validation-schema.interface';

export function useForm(schema: ValidationSchema) {
  const reducedSchema = Object.keys(schema)
      .reduce<any>((acc, key) => ({ ...acc, [key]: null }), {}); // обьект начального стейта формы, ключи - названия инпутов, значение - value инпутов 
  const [valid, setValid] = useState(false);
  const [values, setValues] = useState(reducedSchema);

  const handleInput = ({target: {name, value, checked = false}}: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: checked || value // тут же обработка radio или checkbox, но со строгой проверкой валидатора 
    })
  }

  useEffect(() => {
    const valid = Object.keys(schema)
      .every((name) => (!schema[name].validators?.length // если схема без валидаторов, то она валидна всегда
        ? true
        : schema[name].validators?.every((validator) => validator(values[name]))));
    setValid(valid);
  }, [values]);

  return {
    handleInput,
    values,
    valid,
  };
}
