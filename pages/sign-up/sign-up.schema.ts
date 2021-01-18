import { checkDate } from './../../shared/validators/dateFormat.validator';
import { ValidationSchema } from '../../shared/hooks/validation-schema.interface';
import { isEmail } from '../../shared/validators/isEmail.validator';
import { minLength } from '../../shared/validators/min-length.validator';
import { isChecked } from '../../shared/validators/checked.validator';

export const SignUpSchema: ValidationSchema = {
    firstName: [minLength(2)],
    lastName: [minLength(2)],
    email: [isEmail],
    password: [minLength(8)],
    dateOfBirth: [checkDate],
    agreement: [isChecked]
}