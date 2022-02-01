import { ValidatorFunction } from '../hooks/validation-schema.interface';

export const isChecked: ValidatorFunction = (error: string) => (checked: boolean) => (checked ? null : error);
