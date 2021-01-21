import { checkDate } from './../../shared/validators/dateFormat.validator';
import { ValidationSchema } from '../../shared/hooks/validation-schema.interface';
import { isEmail } from '../../shared/validators/isEmail.validator';
import { minLength } from '../../shared/validators/min-length.validator';
import { isChecked } from '../../shared/validators/checked.validator';
import { isStrongPassword } from '../../shared/validators/password.validator';
import { nameIsCorrect } from '../../shared/validators/name.validator';

export const SignUpSchema: ValidationSchema = {
    firstName: [minLength(2,"Слишком короткое имя!"),nameIsCorrect("Имя может содержать только буквы!")],
    lastName: [minLength(2,"Слишком короткая фамилия!"),nameIsCorrect("Фамилия может содержать только буквы!")],
    email: [isEmail("Почта некорректна!")],
    password: [minLength(8,"Пароль должен быть больше 7 символов!"),isStrongPassword("Слишком простой пароль!")],
    dateOfBirth: [checkDate("Неправильный формат даты!")],
    agreement: [isChecked("Поставьте галочку!")]
}