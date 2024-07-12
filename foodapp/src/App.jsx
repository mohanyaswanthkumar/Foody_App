import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import Cart from './components/Cart';
import UserProfile from './components/UserProfile';
import CheckOut from './components/CheckOut';
import ListItems from './components/ListItems';
import Axios from 'axios';
import { useState } from 'react';
import AddItem from './components/AddItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reciepe from './components/Reciepe';
import Payment from './components/Payment';
import MyOrders from './components/MyOrders';
import { assets, menu_list } from './assets/assets';
const App = () => {
  const [group, setGroup] = useState(null);
  useEffect(() => {
    const checkGroupIn = async () => {
      const resp = await Axios.get('http://localhost:8000/group/');
      if (resp.data.group === 'admins') {
        setGroup('admins');
      } else if (resp.data.group === 'users') {
        setGroup('users');
      } else {
        setGroup(null);
      }
      console.log(resp.data.group);
    };
    checkGroupIn();
  }, []);

  return (
    <div className='App'>
      <ToastContainer/>
      <Navbar />
      <div className="content">
        <Routes>
          {group === 'admins' ? (
            <Route path='/' element={<ListItems />} />
          ) : (
            <Route path='/' element={<Home />} />
          )}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/additem' element={<AddItem/>}/>
          <Route path='/reciepe' element={<Reciepe/>}/>
          <Route path="/payment" component={<Payment/>} />
          <Route path="/orders" component={<MyOrders/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
