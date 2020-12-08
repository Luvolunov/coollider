import { InputData } from "../../shared/interface"
import { checkEmail, checkPassword } from "../../shared/Sign/check"

export const signInFields : Array<InputData> = [  
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
]
