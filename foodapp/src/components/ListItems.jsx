import React, { useContext } from 'react';
import { assets,menu_list,food_list } from '../assets/assets';
import './ListItems.css';
const ListItems = () => {
  const foodList = food_list;
    console.log(foodList);
  return (
    <div className='list'>
      <div className='title'>
        <div><h4>Item</h4></div>
        <div><h4>Name</h4></div>
        <div><h4>Category</h4></div>
        <div><h4>Price</h4></div>
        <div><h4>Remove</h4></div>
      </div>
      <div className='products'>
      {food_list && food_list.map((item, id) => (
        <div key={id} className='product'>
          <img src={item.image} style={{width:'50px',height:'50px'}} />
          <div>{item.name}</div>
          <div>{item.category}</div>
          <div>{item.price}</div>
          <img src={assets.cross_icon} style={{width:'10px',height:'10px',cursor:'pointer'}} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default ListItems;
