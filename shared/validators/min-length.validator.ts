import { Validator } from './../hooks/validation-schema.interface';

export type minLengthValidator = (length: number,error: string) => Validator;

export const minLength: minLengthValidator = (requiredLength: number,error: string) =>
    (value = '') => requiredLength <= value?.length ? null : error;
