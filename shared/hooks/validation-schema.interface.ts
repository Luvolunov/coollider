export interface ValidationSchema {
  [key: string]: Array<Validator>
}

export interface Validator {
  (input: any, values: { [key: string]: any }): string | null;
}

export interface ValidatorFunction {
  (error: string): Validator;
}
