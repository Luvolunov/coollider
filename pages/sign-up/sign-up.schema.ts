import { checkDate } from './../../shared/validators/dateFormat.validator';
import { ValidationSchema } from '../../shared/hooks/validation-schema.interface';
import { isEmail } from '../../shared/validators/isEmail.validator';
import { minLength } from '../../shared/validators/min-length.validator';
import { isChecked } from '../../shared/validators/checked.validator';
import { isStrongPassword } from '../../shared/validators/password.validator';
import { nameIsCorrect } from '../../shared/validators/name.validator';

export const SignUpSchema: ValidationSchema = {
    firstName: [minLength(2),nameIsCorrect],
    lastName: [minLength(2),nameIsCorrect],
    email: [isEmail],
    password: [minLength(8),isStrongPassword],
    dateOfBirth: [checkDate],
    agreement: [isChecked]
}