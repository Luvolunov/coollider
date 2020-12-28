import { ChangeEvent, useEffect, useState } from 'react';
import { ValidationSchema } from './validation-schema.interface';

export function useForm(schema: ValidationSchema) {
  const reducedSchema = Object.keys(schema)
      .reduce<any>((acc, key) => ({ ...acc, [key]: null }), {}); // обьект начального стейта формы, ключи - названия инпутов, значение - value инпутов 
  const [valid, setValid] = useState(false);
  const [values, setValues] = useState(reducedSchema);

  const handleInput = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: value  
    })
  }
  const handleCheckbox = ({target: {name, checked}}: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: checked  
    })
  }

  useEffect(() => {
    const valid = Object.keys(schema)
      .every((name) => 
        !schema[name].validators?.length // схема без валидаторов по дефолту валидна
        ||
        schema[name].validators?.every((validator) => validator(values[name]))); // каждый валидатор должен проходить проверку
    setValid(valid);
  }, [values]);

  return {
    handleInput,
    handleCheckbox,
    values,
    valid,
  };
}
