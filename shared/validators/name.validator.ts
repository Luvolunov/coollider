import {ValidatorFunction} from "../hooks/validation-schema.interface";

const nameReg = new RegExp(/^[А-Яа-я]+$/);

export const nameIsCorrect: ValidatorFunction = (error: string) => (name: string) =>
    nameReg.test(name) ? null : error;
