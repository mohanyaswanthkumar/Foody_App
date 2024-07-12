import React, { useState } from 'react';
import "./Home.css";
import { assets,menu_list } from '../assets/assets';
import Menu from './Menu';
import ExploreMenu from './ExploreMenu';
const Home = () => {
  const [category,setCategory]=useState("All");
  return (
    <div>
      {/* header section */}
      <div className='header'>
      {/* <div className='scroll-top' style={{cursor:'pointer',position:'sticky'}}>
            <button style={{width:'40px',height:'40px'}}><img src={assets.uptop} style={{width:'40px',height:'40px',marginLeft:'1300px'}} alt=''/></button>
        </div> */}
      <img src="header_img.png" style={{marginTop:'60px'}} />
        <div className='header-contents'>
          <h2>Order Your Favourite food here ..|</h2>
          <p>Choose from a diverse menu of food items crafted with fine ingredients and culinary expertise. Our mission is to provide good quality and healthy food for the customers.</p>
          <button>View Menu</button>
        </div>
      </div>
      {/* menu section */}
      <div className='menu' id='menu'>
        <Menu category={category} setCategory={setCategory} />
      </div>
      {/* menu explore section */}
      <ExploreMenu category={category} />
    </div>
  );
};

export default Home;
