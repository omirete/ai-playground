export const validatePassword = (pwd: string): boolean => {
    return pwd.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/) !== null;
};
