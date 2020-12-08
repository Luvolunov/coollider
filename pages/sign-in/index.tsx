import Sign from "../../shared/Sign/Sign";
import {signInFields} from "./data";

export default  function SignIn()
{
	return(
		<Sign fields={signInFields}/>
	)
}