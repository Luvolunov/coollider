import  validator  from 'validator';
import {ValidatorFunction} from "../hooks/validation-schema.interface";

export const isStrongPassword: ValidatorFunction = (error: string) => (password) =>
    validator.isStrongPassword(password === null ? "" : password)  ? null : error;

