export interface ValidationSchema {
  [key: string]: {
    validators?: Array<ValidatorFunction>,
    readonly placeholder?: string,
    readonly type?: string
  }
}

export interface ValidatorFunction {
  (input: any): boolean;
}
