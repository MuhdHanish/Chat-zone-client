import showToast from "./showToast";
import { validateEmail, validatePassword } from "./formValidation";
import axios from "../api/axios";

const validation = {
 validateEmail,
 validatePassword,
};

export const handleLogin = async (toast, loginState, setButtonText, navigate) => {
 const { email, password } = loginState;
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
  const config = {
   Headers: {
    "Content-type": "applicaton-json"
   }
  }
  const userDetials = {
   email: trimmedEmail,
   password: password,
  }
  const { data } = await axios.post("/login", userDetials, { config })
  setButtonText("Log In");
  localStorage.setItem('userInfo', JSON.stringify(data));
  showToast(toast, data.message, "success");
  navigate('/chats');
 } catch (error) {
  showToast(toast, error.response.data.message);
  setButtonText("Log In");
  return;
 }
};
