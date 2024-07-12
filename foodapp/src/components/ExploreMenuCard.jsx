import React, { useState } from 'react';
import { assets } from '../assets/assets';
import './ExploreMenu.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ExploreMenuCard = ({ item }) => {
  const [count, setCount] = useState(0);

  function convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(imageFile);
    });
  }
  

  return (
    <div className='menuitem'>
      <img src={item.image} alt={item.name} />
      <div className="count-container">
        {!count ? (
          <img className='' onClick={() => setCount(prev => prev + 1)} src={assets.add_icon_white} alt="Add" />
        ) : (
          <div>
            <img src={assets.remove_icon_red} onClick={async() => {
              setCount(prev => prev - 1);
              if(count>0)
                {
                  const resp= await axios.post('http://localhost:8000/addcart/',{'productname':item.name,'price':item.price,'category':item.category,'quantity':count,'image': `data:${item.image.type};base64,${await convertImageToBase64(item.image)}`})
                 console.log(resp);
                 toast.success("Added to cart Successfully");
                }
                else
                {
                  const resp = await axios.get(`http://localhost:8000/deletecartitem/${item.name}`);
                  console.log(resp);
                }
              }} className="remove-icon-red" alt="Remove" />
            <p>{count}</p>
            <img src={assets.add_icon_green} onClick={async() => {
              setCount(prev => prev + 1);
              const resp= await axios.post('http://localhost:8000/addcart/',{'productname':item.name,'price':item.price,'category':item.category,'quantity':count})
              console.log(resp);
              }} className="add-icon-green" alt="Add" />
          </div>
        )}
      </div>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <h5>{item.category}</h5>
      <h4>${item.price}</h4>
    </div>
  );
};

export default ExploreMenuCard;
