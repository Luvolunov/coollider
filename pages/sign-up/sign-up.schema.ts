import { checkDate } from './../../shared/validators/dateFormat.validator';
import { ValidationSchema } from '../../shared/hooks/validation-schema.interface';
import { isEmail } from '../../shared/validators/isEmail.validator';
import { minLength } from '../../shared/validators/min-length.validator';
// import { isChecked } from '../../shared/validators/checked.validator';

export const SignUpSchema: ValidationSchema = {
    firstName: {
        validators: [minLength(2)],
        placeholder: "Имя",
    },
    lastName: {
        validators: [minLength(2)],
        placeholder: "Фамилия"
    },
    email: {
        validators: [isEmail],
        placeholder: "Почта"
    },
    password: {
        validators: [minLength(8)],
        placeholder: "Пароль",
        type: "password"
    },
    dateOfBith: {
        validators: [checkDate],
        type: "date"
    }
}
// agreement: {
//     validators: [isChecked]
// }