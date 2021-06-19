import { ValidationSchema } from '../hooks/validation-schema.interface';
import { isEmail } from '../validators/isEmail.validator';
import { minLength } from '../validators/min-length.validator';
import { isChecked } from '../validators/checked.validator';
import { nameIsCorrect } from '../validators/name.validator';

export const SignUpSchema: ValidationSchema = {
  firstName: [
    minLength(2, 'Слишком короткое имя!'),
    nameIsCorrect('Русские буквы без пробелов!'),
  ],
  lastName: [
    minLength(2, 'Слишком короткая фамилия!'),
    nameIsCorrect('Русские буквы без пробелов!'),
  ],
  email: [isEmail('Почта некорректна!')],
  password: [minLength(8, 'Пароль должен быть больше 7 символов!')],
  agreement: [isChecked('Поставьте галочку!')],
};
