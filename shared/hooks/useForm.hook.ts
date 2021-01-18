import { FieldsSchema } from './useForm.schema';
import { ChangeEvent, useEffect, useState,FocusEvent } from 'react';
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


  const inputIsCorrect = (name : string) => (
    !schema[name].validators?.length ||
    schema[name].validators?.every(validator => validator(fields[name].value))
  ) 


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

  const onBlur = ({target: {name,value}}: FocusEvent<HTMLInputElement>) => {
    setValues({
      ...fields,
      [name]: {
        ...fields[name],
        status: inputIsCorrect(name) ? "ok" : !value ? "empty" : "error"
      }
    })
  };

  const onFocus = ({target: {name}} : FocusEvent<HTMLInputElement>) => {
    setValues({
      ...fields,
      [name]: {
        ...fields[name],
        status: "process"
      }
    })
  }

  useEffect(() => {
    const valid = Object.keys(schema)
      .every(name => inputIsCorrect(name));
        setValid(valid);
  }, [fields]);

  return {
    handleInput,
    handleCheckbox,
    onBlur,
    onFocus,
    fields,
    valid,
  };
}
