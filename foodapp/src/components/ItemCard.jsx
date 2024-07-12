import React from 'react';
import './ItemCard.css';
const ItemCard = ({ img, name,category,setCategory }) => {
  return (
    <div className='item_card'>
      <img src={img} alt={name} className={category===name?"active":""} />
      <h5>{name}</h5>
    </div>
  );
};

export default ItemCard;
