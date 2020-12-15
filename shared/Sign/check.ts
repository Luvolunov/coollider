import * as Yup from "yup";


const passwordPattern : RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; //  8 символов 

export const validationSchema  = Yup.object({
	firstName: Yup.string().max(15,"Must be 15 characters or less!").min(2,"Too short firstname!").required("Required"),
	lastName: Yup.string().max(20,"Must be 20 character or less").min(2,"Too short lastname").required("Required"),
	email: Yup.string().email("Please, enter your email").required("Required"),
	password: Yup
    .string()
    .required('Please Enter your password')
    .matches(
      passwordPattern,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ).required("Required"),
})



type correctData = boolean;
export const checkPassword = (password : string,len: number,minLen: number) : correctData => /[0-9]/g.test(password) && len > minLen;
export const checkEmail = (email : string) : correctData => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email); 
export const checkName = (name : string) : correctData => /[А-ЯЁ][а-яё]+\s+[А-ЯЁ][а-яё]+(?:\s+[А-ЯЁ][а-яё]+)?/.test(name);