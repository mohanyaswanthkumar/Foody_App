import React, { useState } from 'react';
import './Cart.css';
import { useEffect} from 'react';
import Axios from 'axios';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cart = () => {
  const [cart,setCart]=useState(null);
  const [csum,setCsum]=useState(0);
  useEffect(() => {
    const checkGroupIn = async () => {
      const resp=await Axios.get('http://localhost:8000/viewcart/')
      setCart(resp.data.cart);
      console.log(resp.data);
      if (resp.data.cart && resp.data.cart.length > 0) {
        let sum = resp.data.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        setCsum(sum);
      } else {
        setCsum(0);
      }
    };
    checkGroupIn();
  }, []);
  
  return (
    <div className='cart'>
      <div className='cart-list'>
        <div className='cart-list-col'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr style={{marginLeft:'155px',width:'1060px',position:'relative',top:'20px'}} />
        <div className='cart-list-items'>
        {cart && cart.map((item, id) => (
  <div className='cart-list-item' key={id}>
    <div>{id}</div>
    <div>{item.productname}</div>
    <div>{item.price}</div>
    <div>{item.quantity}</div>
    <div>{item.price * item.quantity}</div>
    <img style={{cursor:'pointer',width:'10px',height:'10px'}}
  onClick={async () => {
    try {
      const resp = await Axios.get(`http://localhost:8000/deletecartitem/${item.productname}`);
      console.log(resp.data);
      toast.success("Deleted from cart successfully");
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error("Unable to delete from cart");
    }
  }}
  src={assets.cross_icon}
  alt="Remove"
/>

  </div>
))}

</div>
    </div>
      <div className='cart-bottom'>
        <div className='cart-checkout'>
            <h3>Cart Totals</h3>
            <div className='checkout-items'>
              <h5>Sub-total</h5>
              <h5>{csum}/-</h5>
            </div>
            <hr/>
            <div className='checkout-items'>
              <h5>Delivery Fee</h5>
              <h5>{csum%20}/-</h5>
            </div>
            <hr/>
            <div className='checkout-items'>
              <h5>Total</h5>
              <h5>{(csum)+(csum%20)}/-</h5>
            </div>
            <hr/>
            {/* <button href='/checkout'>Checkout</button> */}
            <Link to="/checkout">Checkout</Link>
        </div>
        <div className='cart-coupon'>
        <p>If you have any promocode enter here</p>
        <div className='code'>
          <input type="text" placeholder="Enter Code"/><br/>
          <button>Apply Promocode</button><br/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
