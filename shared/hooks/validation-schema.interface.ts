export interface ValidationSchema {
  [key: string]: {
    validators?: Array<ValidatorFunction>
  }
}

export interface ValidatorFunction {
  (input: any): boolean;
}
