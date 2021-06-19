import { ValidationSchema } from '../../shared/hooks/validation-schema.interface';
import { minLength } from '../../shared/validators/min-length.validator';

export const createCourseSchema: ValidationSchema = {
  name: [minLength(2, 'Название должно быть длиннее 2 символов')],
  imageUrl: [minLength(2, 'Ссылка должна быть длиннее 2 символов')],
};
