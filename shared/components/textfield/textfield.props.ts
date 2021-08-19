import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface TextareaField extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fieldType?: 'textarea';
  errors?: Array<string>;
}

export interface InputField extends InputHTMLAttributes<HTMLInputElement> {
  fieldType?: 'input';
  errors?: Array<string>;
}
