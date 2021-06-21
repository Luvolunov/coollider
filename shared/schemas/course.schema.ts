import { ValidationSchema } from '../hooks/validation-schema.interface';
import { minLength } from '../validators/min-length.validator';

export const courseSchema: ValidationSchema = {
  name: [minLength(2, 'Название должно быть длиннее 2 символов')],
  imageUrl: [minLength(2, 'Ссылка должна быть длиннее 2 символов')],
};