import Sign from "../../shared/Sign/Sign";
import {signUpFields} from "./data";

export default function SignUp()
{
	return(
		<Sign
		changeForm={
			{
				href: "/sign-in",
				textContent: "У меня есть аккаунт"
			}
		} 
		 fields={signUpFields}/>
	)
}