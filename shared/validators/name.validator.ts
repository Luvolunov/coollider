import {ValidatorFunction} from "../hooks/validation-schema.interface";

const nameReg : RegExp = new RegExp(/^[А-Яа-я]+$/);

export const nameIsCorrect: ValidatorFunction = (error:string) => (name: string) =>
    nameReg.test(name) ? null : error;
