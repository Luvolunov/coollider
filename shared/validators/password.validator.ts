import  validator  from 'validator';
import {ValidatorFunction} from "../hooks/validation-schema.interface";

export const isStrongPassword: ValidatorFunction = (password) =>
    validator.isStrongPassword(password === null ? "" : password)  ? null : { isStrongPassword: true };

