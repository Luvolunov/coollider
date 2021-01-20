import {ValidatorFunction} from "../hooks/validation-schema.interface"
import validator from "validator"

export const isEmail: ValidatorFunction = (value: string) => 
    validator.isEmail(value === null ? "" : value) ? null : { isEmail: true }

    console.log(validator.isDate("2020"))