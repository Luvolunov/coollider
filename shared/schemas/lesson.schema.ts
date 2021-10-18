/* eslint-disable import/prefer-default-export */
import { ValidationSchema } from '../hooks/validation-schema.interface';
import { minLength } from '../validators/min-length.validator';

export const lessonSchema: ValidationSchema = {
  name: [minLength(1, 'Обязательное поле')],
  available: [],
};
