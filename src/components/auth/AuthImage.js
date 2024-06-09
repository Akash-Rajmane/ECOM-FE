import React from 'react';
import signupImg from "../../assets/signup.png";
import loginImg from "../../assets/login.png";


const AuthImage = ({mode}) => {

  return (
    <img src={mode==="login"?loginImg:signupImg} alt={mode==="login"?"login-image":"signup-image"} width={"100%"} height={"100%"}/> 
  )
}

export default AuthImage