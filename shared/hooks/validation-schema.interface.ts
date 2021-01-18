export interface ValidationSchema {
  [key: string]: Array<ValidatorFunction>
}

export interface ValidatorFunction {
  (input: any): null | { [key: string]: true };
}
