import React from 'react'
import './Footer.css';
import { assets,menu_list } from '../assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='left'>
            <img src={assets.logo} />
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, non?Lorem ipsum dolor sit amet.</p>
            <div className='social-icons'>
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
        </div>
        <div className='middle'>
            <h3>Company</h3>
            <div className='str'>
            <a href="#">Home</a>
            <a href="#">Delivery</a>
            <a href="#">Private Policy</a>
            <a href="#">About us</a>
            </div>
        </div>
        <div className='right'>
        <h3>Get-In-Touch</h3>
            <div className='str'>
            <a href="#">+91-7981434355</a>
            <a href="#">bitramohanyaswanthkumar@gmail.com</a>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
