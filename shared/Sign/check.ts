type correctData = boolean;

export const checkPassword = (password : string,len: number,minLen: number) : correctData => /[0-9]/g.test(password) && len > minLen;
export const checkEmail = (email : string) : correctData => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email); 
export const checkName = (name : string) : correctData => /[А-ЯЁ][а-яё]+\s+[А-ЯЁ][а-яё]+(?:\s+[А-ЯЁ][а-яё]+)?/.test(name);