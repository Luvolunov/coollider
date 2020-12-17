export interface ValidationSchema {
	[key: string]: {
		valid?: boolean;
		validators?: Array<ValidatorFunction>
	}
}

export interface ValidatorFunction {
	(input: any): boolean;
}