import { Validator } from '../hooks/validation-schema.interface';

type ConfirmPasswordValidator = (field: string, error: string) => Validator;

export const confirmValidator: ConfirmPasswordValidator = (
  field,
  error,
) => (value: string, values) => (values[field] !== value ? error : null);
