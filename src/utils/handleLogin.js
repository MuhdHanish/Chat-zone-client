import showToast from "./showToast";
import { validateEmail, validatePassword } from "./formValidation";

const validation = {
 validateEmail,
 validatePassword,
};

export const handleLogin = async (toast, loginState, setButtonText) => {
 const {  email, password } = loginState;
 const trimmedEmail = email.trim();

 if (!validation.validateEmail(trimmedEmail)) {
  showToast(toast, "Invalid email");
  return;
 }

 if (!validation.validatePassword(password)) {
  showToast(toast, "Invalid password");
  return;
 }

 try {
  setButtonText("Sending");
  
 } catch (error) {
  showToast(toast, error.response.data.message);
  return;
 }
};
