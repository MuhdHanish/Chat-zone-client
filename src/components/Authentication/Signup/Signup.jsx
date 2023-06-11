import { FormControl, FormLabel} from '@chakra-ui/react'
import React, {  useState } from 'react'
import HandleForm from '../../../Hooks/HandleForm'
import './Signup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons'

const Signup = () => {
  const [signupState,setSignupState] = HandleForm({
    name:'',
    email:'',
    passoword:''
  });
  const [errors,setError] = useState({})
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const validation = {
    name: /^[a-zA-Z0-9]{4,12}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  const trimmedname = signupState.name.trim();
  if (validation.name.test(trimmedname)  === false) {
    setError({name: 'Invalid name'});
    return;
  }
  const trimmedEmail = signupState.email.trim();
  if (validation.email.test(trimmedEmail) === false) {
    setError({email: 'Invalid email' });
    return;
  }
  if (validation.password.test(signupState.password) === false) {
    setError({ password: 'Invalid password' });
    return;
  }
  try{
      setError({})
      setButtonText('Sending')
  } catch (error) {
      setError({general:error.response.data.message})
   }
  };
  const [buttonText, setButtonText] = useState("Send");
  return (
    <section className="signup-form">
      <form onSubmit={handleSubmit}>
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
        {errors.name && <p className="error">{errors.name}</p>}
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
        {errors.email && <p className="error">{errors.email}</p>}
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

export default Signup