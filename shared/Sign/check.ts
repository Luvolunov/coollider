type correctData = boolean;

export const checkPassword = (password : string,len: number,minLen: number) : correctData => /[0-9]/g.test(password) && len > minLen; // нужно подумать
export const checkEmail = (email : string) : correctData => /\S+@\S+\.\S+/.test(email); 
export const checkName = (name : string) : correctData => /[А-ЯЁ][а-яё]+\s+[А-ЯЁ][а-яё]+(?:\s+[А-ЯЁ][а-яё]+)?/.test(name);