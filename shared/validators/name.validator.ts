import {ValidatorFunction} from "../hooks/validation-schema.interface";

const nameReg = /^(?=[А-Яа-я])(?!.*[_.]{2})[^_.].*[^_.]$/gi;

export const nameIsCorrect: ValidatorFunction = (error:string) => (name: string) =>
    nameReg.test(name) ? null : error;
