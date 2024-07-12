import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Model from 'react-modal';
import Login from './Login';
import SignUp from './SignUp';
// import AddItems from './AddItems'; // Import the components you need
// import AllOrders from './AllOrders';
// import ListItems from './ListItems';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Axios from 'axios';
Axios.defaults.withCredentials = true;

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [group, setGroup] = useState(null);

  const handleMenuClick = (section) => {
    setMenu(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const resp = await Axios.get('http://localhost:8000/isloggedin/');
      if (resp.data.isloggedin === true) {
        setIsLoggedIn(true);
      }
      console.log(resp.data.isloggedin);
    };
    checkLoggedIn();
  }, []);

  useEffect(() => {
    const checkGroupIn = async () => {
      const resp = await Axios.get('http://localhost:8000/group/');
      if (resp.data.group === 'admins') {
        setGroup('admins');
        setMenu("list-items")
      } else if (resp.data.group === 'users') {
        setGroup('users');
        setMenu("home")
      } else {
        setGroup(null);
        setMenu("home")
      }
      console.log(resp.data.group);
    };
    checkGroupIn();
  }, []);
const history=useNavigate();
  return (
    <div className='nav'>
      <img src={assets.logo} className='logo' alt='Logo' />
      {group === null || group === 'users' ? (
        <>
            <a className={menu === 'home' ? 'active' : ''} onClick={() => {handleMenuClick('home');history('/')}}>
            Home
          </a>
          <a className={menu === 'menu' ? 'active' : ''} onClick={() => handleMenuClick('menu')}>
            Menu
          </a>
          <a href='/reciepe' className={menu === 'reciepe' ? 'active' : ''} onClick={() => handleMenuClick('reciepe')}>
            Reciepe
          </a>
          <a className={menu === 'contact us' ? 'active' : ''} onClick={() => handleMenuClick('footer')}>
            Contact Us
          </a>
          {isLoggedIn && (
            <a className={menu === 'cart' ? 'active' : ''} onClick={() => handleMenuClick('cart')} href='/cart'>
              Cart
            </a>
          )}
        </>
      ) : (
        <>
          <a href='/additem' className={menu === 'add-items' ? 'active' : ''} onClick={() =>{ handleMenuClick('add-items');setMenu("add-items")}}>
            Add Items
          </a>
          <a className={menu === 'all-orders' ? 'active' : ''} onClick={() =>{ handleMenuClick('all-orders');setMenu("all-orders")}}>
            All Orders
          </a>
          <a href='/' className={menu === 'list-items' ? 'active' : ''} onClick={() => {handleMenuClick('list-items');setMenu("list-items")}}>
            List Items
          </a>
        </>
      )}
      {isLoggedIn ? (
        <a className={menu === 'profile' ? 'active' : ''} onClick={() =>{ handleMenuClick('profile');setMenu("profile")}} href='/userprofile'>
          Profile
        </a>
      ) : (
        <div>
          <a onClick={() => setOpenLogin(true)}>Login</a>
          <a onClick={() => setOpenSignup(true)}>Signup</a>
        </div>
      )}
      <div>
        <Model isOpen={openLogin} onRequestClose={() => setOpenLogin(false)} appElement={document.getElementById('root')}  style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            width: '420px',
            height: '450px',
            marginLeft:'460px',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'50px'
          },
        }} >
          <Login setOpenLogin={setOpenLogin} setIsLoggedIn={setIsLoggedIn} />
        </Model>
        <Model isOpen={openSignup} onRequestClose={() => setOpenSignup(false)} appElement={document.getElementById('root')}>
          <SignUp setOpenSignup={setOpenSignup} setIsLoggedIn={setIsLoggedIn} setOpenLogin={setOpenLogin} />
        </Model>
      </div>
    </div>
  );
};

export default Navbar;
