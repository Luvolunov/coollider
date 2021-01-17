import { FieldsSchema } from './useForm.schema';
import { ChangeEvent, useEffect, useState } from 'react';
import { ValidationSchema } from './validation-schema.interface';

export function useForm(schema: ValidationSchema) {
  const reducedSchema = Object.keys(schema)
      .reduce<any>((acc : FieldsSchema, key) => (
        { ...acc, [key]: {
          placeholder: schema[key].placeholder || "",
          type: schema[key].type || "",
          status: "empty",
          value: null
        } }), {}); 


  const [valid, setValid] = useState(false);
  const [fields, setValues] = useState(reducedSchema);



  const handleInput = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...fields,
      [name]: {
        ...fields[name],
        value
      }  
    })
  }
  const handleCheckbox = ({target: {name, checked}}: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...fields,
      [name]: checked  
    })
  }

  useEffect(() => {
    const valid = Object.keys(schema)
      .every(name => 
        !schema[name].validators?.length
        ||
        schema[name].validators?.every(validator => validator(fields[name].value)));
        setValid(valid);
  }, [fields]);

  return {
    handleInput,
    handleCheckbox,
    fields,
    valid,
  };
}
