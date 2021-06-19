import { ValidationSchema } from '../../../shared/hooks/validation-schema.interface';
import { isEmail } from '../../../shared/validators/isEmail.validator';
import { minLength } from '../../../shared/validators/min-length.validator';
import { isChecked } from '../../../shared/validators/checked.validator';
import { nameIsCorrect } from '../../../shared/validators/name.validator';

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
