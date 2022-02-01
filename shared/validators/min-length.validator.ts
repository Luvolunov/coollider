import { Validator } from '../hooks/validation-schema.interface';

export type MinLengthValidator = (length: number, error: string) => Validator;

export const minLength: MinLengthValidator = (requiredLength: number, error: string) => (value = '') => (requiredLength <= value?.length ? null : error);
