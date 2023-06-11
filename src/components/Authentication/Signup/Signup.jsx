import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  HandleForm,
  showToast,
  uploadImageToCloudinary,
  handleSignup,
} from "../../../utils";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [profile, setProfile] = useState("");
  const [buttonText, setButtonText] = useState("Sign Up");
  const [show, setShow] = useState(false);
  const [signupState, setSignupState] = HandleForm({
    name: "",
    email: "",
    password: "",
  });

  const HandleImage = async (event) => {
    const profile = event.target.files[0];
    setButtonText("Uploading");
    if (profile === undefined) {
      showToast(toast, "Please select an image!", "warning");
      return;
    } else if (profile.type === "image/jpeg" || profile.type === "image/png") {
      try {
        const imageUrl = await uploadImageToCloudinary(profile);
        setProfile(imageUrl);
        setButtonText("Sign Up");
      } catch (error) {
        console.log(error);
        setButtonText("Sign Up");
        showToast(toast, "Failed to upload image", "warning");
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    handleSignup(toast, signupState, profile, setButtonText, navigate);
  };

  return (
    <section className="signup-form">
      <form onSubmit={handleFormSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <input
            type="text"
            placeholder=" Name"
            name="name"
            value={signupState.name}
            spellCheck="false"
            onChange={setSignupState}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={signupState.email}
            spellCheck="false"
            onChange={setSignupState}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <div className="password-input">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={signupState.password}
              spellCheck="false"
              onChange={setSignupState}
            />
            {show ? (
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => setShow(false)}
                size="sm"
                className="eye-icon"
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                size="sm"
                onClick={() => setShow(true)}
                className="eye-icon"
              />
            )}
          </div>
        </FormControl>
        <FormControl>
          <FormLabel>Image</FormLabel>
          <div className="file-input">
            <input
              type="file"
              name="image"
              accept="image/*"
              id="image-input"
              onChange={HandleImage}
              onClick={(event) => (event.target.value = null)} // Reset file selection on click
            />
            <label htmlFor="image-input">
              <span>Choose Image</span>
            </label>
          </div>
        </FormControl>
        <button type="submit">
          <span>{buttonText}</span>
        </button>
      </form>
    </section>
  );
};

export default Signup;
