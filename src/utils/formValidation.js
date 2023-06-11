export const validateName = (name) => {
 const nameRegex = /^[a-zA-Z0-9]{4,12}$/;
 return nameRegex.test(name);
};

export const validateEmail = (email) => {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegex.test(email);
};

export const validatePassword = (password) => {
 const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
 return passwordRegex.test(password);
};
