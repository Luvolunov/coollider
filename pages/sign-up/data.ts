import { InputData } from './../../shared/interface';
import { checkEmail, checkName, checkPassword } from "../../shared/Sign/check"

export const signUpFields : Array<InputData> = [  
	{
		 type: "Email",
		 checkData: checkEmail,
		 valid: false
	},
	{
		 type: "Password",
		 checkData : checkPassword,
		 valid: false,
		 minLen: 8,
	},
	{
		type: "Name",
		checkData : checkName,
		valid: false,
		minLen: 2,
  },
]
