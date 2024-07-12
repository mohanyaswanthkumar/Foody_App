import React, { useState } from 'react';
import Axios from 'axios';
import './Login.css';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = ({ setOpenLogin, setIsLoggedIn }) => {
  const [username, setUsername] = useState('nani');
  const [password, setPassword] = useState('Nani@123');
  const history = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:8000/login/', { username, password });
      if (response.data.success==true) {
        setIsLoggedIn(true);
        setOpenLogin(false); 
        toast.success("Login Successfully");
        history('/');
      } else{
        setOpenLogin(true);
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='login'>
      <img src={assets.cross_icon} style={{marginLeft:'380px',marginTop:'3px',cursor:'pointer',width:'12px'}}  onClick={()=>{setOpenLogin(false)}} />
      <div className='login-text'>
        <h5>Welcome back</h5>
        <h3>Login to your account</h3>
      </div>
      <form className='login-form' method='post' onSubmit={handleLogin}>
        <input type='text' id='username' name='username' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' id='password' name='password' placeholder='Enter Password Here' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
      <div className='no-account' style={{marginTop:'20px'}}>
        <h5>Don't have an account?</h5>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
};

export default Login;
