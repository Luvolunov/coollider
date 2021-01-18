import { InputStatus } from './../../hooks/useForm.schema';
import { InputHTMLAttributes } from 'react';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
    label?:string;
    status: InputStatus;
    [key:string]: any;
}