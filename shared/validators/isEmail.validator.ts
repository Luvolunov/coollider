import {ValidatorFunction} from "../hooks/validation-schema.interface"
import validator from "validator"

export const isEmail: ValidatorFunction = (error: string) => (value: string) => 
    validator.isEmail(value === null ? "" : value) ? null : error
