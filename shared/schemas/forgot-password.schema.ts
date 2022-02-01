import { ValidationSchema } from '../hooks/validation-schema.interface';
import { isEmail } from '../validators/isEmail.validator';

export const ForgotPasswordSchema: ValidationSchema = {
  email: [isEmail('Почта некорректна!')],
};
