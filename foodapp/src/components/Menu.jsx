import React from 'react';
import { assets, menu_list } from '../assets/assets'; // Updated import statements
import ItemCard from './ItemCard';
import './Menu.css';
const Menu = ({category,setCategory}) => {
  console.log(category);
  return (
    <div className='menu'id='menu' >
      <h5>Choose the required item of your requirement</h5>
      <div className='menulist'>
      {menu_list.map((item) => (
        <div  key={item.menu_name} onClick={()=>{setCategory(category==item.menu_name?"All":item.menu_name)}}>
        <ItemCard img={item.menu_image} name={item.menu_name} category={category} setCategory={category} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default Menu;
