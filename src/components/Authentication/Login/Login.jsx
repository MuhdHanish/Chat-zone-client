import React, { useState } from 'react'
import HandleForm from '../../../Hooks/HandleForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash,faEye } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import './Login.css'

const Login = () => {
    const [loginState, setLoginState] = HandleForm({
      email: "",
      passoword: "",
    });
    const [errors, setError] = useState({});
    const [show,setShow] = useState(false)
    const handleShow = () =>{
      setShow(!show)
    }
    const validation = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const trimmedEmail = loginState.email.trim();
      if (validation.email.test(trimmedEmail) === false) {
        setError({ email: "Invalid email" });
        return;
      }
      if (validation.password.test(loginState.password) === false) {
        setError({ password: "Invalid password" });
        return;
      }
      try {
        setError({});
        setShow(false)
        setButtonText("Sending");
      } catch (error) {
        setError({ general: error.response.data.message });
      }
    };
    const [buttonText, setButtonText] = useState("Log In");
  return (
    <section className="login-form">
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={loginState.email}
            spellCheck="false"
            onChange={setLoginState}
          />
        </FormControl>
        {errors.email && <p className="error">{errors.email}</p>}
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <div className="password-input">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={loginState.password}
              spellCheck="false"
              onChange={setLoginState}
            />
            {show ? (
              <FontAwesomeIcon
                icon={faEye}
                onClick={handleShow}
                size="sm"
                className="eye-icon"
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                size="sm"
                onClick={handleShow}
                className="eye-icon"
              />
            )}
          </div>
        </FormControl>
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">
          <span>{buttonText}</span>
        </button>
      </form>
    </section>
  );
}

export default Login