import { checkDate } from './../../shared/validators/dateFormat.validator';
import { ValidationSchema } from '../../shared/hooks/validation-schema.interface';
import { isEmail } from '../../shared/validators/isEmail.validator';
import { minLength } from '../../shared/validators/min-length.validator';
import { isChecked } from '../../shared/validators/checked.validator';

export const SignUpSchema: ValidationSchema = {
    firstName: {
        validators: [minLength(2)]
    },
    lastName: {
        validators: [minLength(2)]
    },
    email: {
        validators: [isEmail]
    },
    password: {
        validators: [minLength(8)]
    },
    dateOfBith: {
        validators: [checkDate]
    },
    agreement: {
        validators: [isChecked]
    }
}