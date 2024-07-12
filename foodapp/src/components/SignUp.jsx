import React, { useState } from 'react'
import "./SignUp.css";
import Axios from 'axios';
const SignUp = ({setOpenSignup,setIsLoggedIn,setOpenLogin,}) => {
  const [username,setUsername]=useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail]=useState("");
  return (
    <div className='signup'>
      <div className='signup-text'>
        <h5>Welcome</h5>
        <h4>Create an account</h4>
      </div>
      <form className='signup-form'>
        <input type='text' name='username' id='username' placeholder='Enter Username' onChange={(e)=>{e.preventDefault();setUsername(e.target.value);}} />
        <input type='email' name='email' id='email' placeholder='Enter Email'onChange={(e)=>{e.preventDefault();setEmail(e.target.value);}}  />
        <input type='password' name='password' id='password' placeholder='Enter Password' onChange={(e)=>{e.preventDefault();setPassword(e.target.value);}}  />
        <input type='password' name='confirm-password' id='confirm-password' placeholder='Enter Password'/>
        <button onClick={async(e)=>{
          e.preventDefault();
          console.log(username+" "+password+" "+email);
          let res=await Axios.post('http://localhost:8000/signup/',{'username':username,'password':password,'email':email});
          if(res.data.message==='User created successfully!')
            {
              setIsLoggedIn(false);
              setOpenSignup(false);
              setOpenLogin(true);
            }
        }} >Create Account</button>
      </form>
    </div>
  )
}

export default SignUp;
