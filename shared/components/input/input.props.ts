import { InputHTMLAttributes } from 'react';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
    label?:string;
    [key:string]: any;
    errors: Array<string>;
    touch?: boolean
}