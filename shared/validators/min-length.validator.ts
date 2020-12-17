export const minLength = (requiredLength: number) => (value = '') => requiredLength <= value?.length;
