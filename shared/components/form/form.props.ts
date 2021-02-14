import { InputHTMLAttributes } from 'react';

export interface FormProps extends InputHTMLAttributes<HTMLFormElement> {
  children?: JSX.Element[];
  [key:string]: any;
}
