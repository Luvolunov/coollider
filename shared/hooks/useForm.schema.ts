import { ValidationSchema } from './validation-schema.interface';

export type InputStatus = "empty" | "process" | "ok" | "error";
 
export interface FieldsSchema extends ValidationSchema {
        [key: string]: {
            status: InputStatus,
            readonly placeholder?: string
        }
    
}