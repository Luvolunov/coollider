import { ValidationSchema } from '../../shared/hooks/validation-schema.interface';
import { isEmail } from '../../shared/validators/isEmail.validator';
import { minLength } from '../../shared/validators/min-length.validator';
import { isStrongPassword } from '../../shared/validators/password.validator';

export const SignInSchema: ValidationSchema = {
  email: [isEmail],
  password: [minLength(8),isStrongPassword],
};
