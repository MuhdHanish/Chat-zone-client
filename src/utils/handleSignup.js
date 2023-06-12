import axios from "../api/axios";
import showToast from "./showToast";
import { validateName, validateEmail, validatePassword } from "./formValidation";

const validation = {
  validateName,
  validateEmail,
  validatePassword,
};

export const handleSignup = async (toast, signupState, profile, setButtonText, navigate) => {
  const { name, email, password } = signupState;
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!validation.validateName(trimmedName)) {
    showToast(toast, "Invalid name");
    return;
  }

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
        "Content-type" : "applicaton-json"
      }
    }
    const userDetials = {
      name: trimmedName,
      email: trimmedEmail,
      password: password,
      image: profile
    }
    const {data} = await axios.post("/register", userDetials,{config})
    setButtonText("Sign Up");
    localStorage.setItem('userInfo', JSON.stringify(data));
    showToast(toast, data.message, "success");
    navigate('/chats');
  } catch (error) {
    setButtonText("Sign Up");
    showToast(toast, error.response.data.message);
    return;
  }
};
