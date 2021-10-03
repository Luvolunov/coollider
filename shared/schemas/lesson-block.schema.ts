import { ValidationSchema } from '../hooks/validation-schema.interface';
import { minLength } from '../validators/min-length.validator';

export const lessonBlockSchema: ValidationSchema = {
  blockTypeId: [minLength(1, '')],
};
