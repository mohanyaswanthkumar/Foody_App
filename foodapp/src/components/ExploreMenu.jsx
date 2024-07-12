// ExploreMenu.jsx

import React, { useContext } from 'react';
import { assets, food_list } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';
import './ExploreMenu.css';
import ExploreMenuCard from './ExploreMenuCard'; // Import the new component
import { useState } from 'react';

const ExploreMenu = ({ category }) => {
  const foodList = useContext(StoreContext);

  let filteredList = [];
  if (category === 'All') {
    filteredList = food_list;
  } else {
    filteredList = food_list.filter(item => item.category === category);
  }

  return (
    <div>
      <div className="exploremenu">
        {filteredList.map((item, index) => (
          <ExploreMenuCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
