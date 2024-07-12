import React, { useState } from 'react';
import './AddItem.css';
import { assets, food_list } from '../assets/assets';

const AddItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        imageFile: null,
    });

    const [items, setItems] = useState(food_list);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            imageFile: file,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name: formData.name,
            description: formData.description,
            category: formData.category,
            price: parseFloat(formData.price),
            image: null, 
        };

        if (formData.imageFile) {
            const imageUrl = URL.createObjectURL(formData.imageFile);
            assets[newItem.name] = imageUrl; 
            newItem.image = imageUrl;

            const updatedItems = [...items, newItem].sort((a, b) => b.price - a.price);
            setItems(updatedItems);

            setFormData({
                name: '',
                description: '',
                category: '',
                price: '',
                imageFile: null,
            });
        } else {
            alert('Please select an image file.');
        }
    };

    return (
        <div className='add-item'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='name'
                    id='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter Item name'
                    required
                />
                <input
                    type="text"
                    name='description'
                    id='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Description'
                    required
                />
                <input
                    type="text"
                    name='category'
                    id='category'
                    value={formData.category}
                    onChange={handleChange}
                    placeholder='Category'
                    required
                />
                <div className='side'>
                    <input
                        type="number"
                        name='price'
                        id='price'
                        value={formData.price}
                        onChange={handleChange}
                        placeholder='Price'
                        required
                    />
                    <label htmlFor='image'>
                        <img src={assets.upload_area} style={{ cursor: 'pointer' }} alt='Add-image' />
                    </label>
                    <input
                        type='file'
                        name='image'
                        id='image'
                        onChange={handleFileChange}
                        hidden
                        required
                    />
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}

export default AddItem;
