const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$');

const passwordRegexMessage = 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character';

export const REGIX = {
    passwordRegex,
};

export const REGIX_MESSAGE = {
    passwordRegexMessage,
};