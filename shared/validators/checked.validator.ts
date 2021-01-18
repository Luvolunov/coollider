import {ValidatorFunction} from "../hooks/validation-schema.interface";

export const isChecked: ValidatorFunction = (checked: boolean) => checked ? null : { isChecked: true };