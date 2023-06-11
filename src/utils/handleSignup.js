import showToast from "./showToast";
import { validateName, validateEmail, validatePassword } from "./formValidation";

const validation = {
 validateName,
 validateEmail,
 validatePassword,
};

export const handleSignup = async (toast,signupState,profile,setButtonText) => {
 const { name, email, password } = signupState;
 const trimmedName = name.trim();
 const trimmedEmail = email.trim();

 if (!validation.validateName(trimmedName)) {
  showToast(toast,"Invalid name");
  return;
 }

 if (!validation.validateEmail(trimmedEmail)) {
  showToast(toast,"Invalid email");
  return;
 }

 if (!validation.validatePassword(password)) {
  showToast(toast,"Invalid password");
  return;
 }

 try {
  setButtonText("Sending");
  
 } catch (error) {
  showToast(toast,error.response.data.message);
  return;
 }
};
