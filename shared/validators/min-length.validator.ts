import {ValidatorFunction} from "../hooks/validation-schema.interface";

export type minLengthValidator = (length: number) => ValidatorFunction;

export const minLength: minLengthValidator = (requiredLength: number) =>
    (value = '') => requiredLength <= value?.length ? null : { minLength: true };
