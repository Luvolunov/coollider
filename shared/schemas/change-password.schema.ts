import { ValidationSchema } from '../hooks/validation-schema.interface';
import { minLength } from '../validators/min-length.validator';
import { confirmValidator } from '../validators/confirm-password.validator';

export const ChangePasswordSchema: ValidationSchema = {
  password: [minLength(8, 'Пароль должен быть больше 7 символов!')],
  confirmPassword: [confirmValidator('password', 'Пароли не совпадают')],
};
