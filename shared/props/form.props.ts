import { InputHTMLAttributes } from 'react';
export interface FormProps extends InputHTMLAttributes<HTMLFormElement> {
    children?: any;
    [key:string]: any;
}