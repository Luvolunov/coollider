import Sign from "../../shared/Sign/Sign";
import {signInFields} from "./data";

export default  function SignIn()
{
	return(
		<Sign
		changeForm={
			{
				href: "/sign-up",
				textContent: "У меня нет аккаунта"
			}
		} 
		fields={signInFields}/>
	)
}