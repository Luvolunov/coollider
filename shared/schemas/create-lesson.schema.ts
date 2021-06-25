import { ValidationSchema } from '../hooks/validation-schema.interface';
import { minLength } from '../validators/min-length.validator';

export const createLessonSchema: ValidationSchema = {
  name: [minLength(1, 'Обязательное поле')],
};
