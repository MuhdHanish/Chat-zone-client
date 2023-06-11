import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormLabel, useToast } from "@chakra-ui/react";
import "./Login.css";

import {
  HandleForm , handleLogin } from "../../../utils";

const Login = () => {

 const [buttonText, setButtonText] = useState("Sign Up");

 const [loginState, setLoginState] = HandleForm({
   email: "",
   password: "",
 });
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    handleLogin(toast, loginState, setButtonText);
  };

  return (
    <section className="login-form">
      <form onSubmit={handleFormSubmit}>
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
        <button type="submit">
          <span>{buttonText}</span>
        </button>
      </form>
    </section>
  );
};

export default Login;
