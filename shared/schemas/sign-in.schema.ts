import { ValidationSchema } from '../hooks/validation-schema.interface';
import { isEmail } from '../validators/isEmail.validator';
import { minLength } from '../validators/min-length.validator';

export const SignInSchema: ValidationSchema = {
  email: [isEmail('Почта некорректна!')],
  password: [minLength(8, 'Пароль должен быть больше 7 символов!')],
};
