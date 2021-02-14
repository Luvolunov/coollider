import { ValidatorFunction } from '../hooks/validation-schema.interface';

const dateFormat = /[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/; // YYYY-MM-DD
export const checkDate: ValidatorFunction = (error: string) => (date: string) => (dateFormat.test(date) ? null : error);
