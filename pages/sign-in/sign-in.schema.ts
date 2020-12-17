import {ValidationSchema} from "../../shared/hooks/validation-schema.interface";
import {isEmail} from "../../shared/validators/isEmail.validator";



export const SignInSchema: ValidationSchema = {
	email: {
		valid: false,
		validators: [isEmail]
	},
	password: {
		valid: true
	}
}