type correctData = boolean;

export const checkPassword = (password : string) : correctData => /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
export const checkEmail = (email : string) : correctData => /\S+@\S+\.\S+/.test(email); 
export const checkName = (name : string) : correctData => /[А-ЯЁ][а-яё]+\s+[А-ЯЁ][а-яё]+(?:\s+[А-ЯЁ][а-яё]+)?/.test(name);