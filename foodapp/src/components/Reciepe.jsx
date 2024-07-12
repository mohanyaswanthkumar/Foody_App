import React, { useState } from 'react';
import axios from 'axios';
import './Reciepe.css';
import { toast } from 'react-toastify';
const Reciepe = () => {
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const search = async () => {
        const url = 'http://localhost:8000/meals/?searchTerm=' + searchInput;
        console.log(searchInput);
        if (searchInput.length === 0) {
            toast.error("Input Text Required..!");
            setData(null);
        } else {
            try {
                const response = await axios.get(url);
                const responseData = response.data;
                const meal = responseData.meals ? responseData.meals[0] : null;
                if (meal) {
                    setData(meal);
                    setErrorMsg('');
                } else {
                    setData(null);
                    toast.error("No meal found.");
                }
            } catch (error) {
                console.error('Error fetching meal data:', error);
                toast.error("Invalid Input");
                setData(null);
            }
        }
    };

    return (
        <div className='rec-sec'>
            <div className='search'>
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-bar"
                placeholder="Search meal..."
            />
            <button onClick={search}>Search</button>
            </div>
            {data && (
                <div className="recipe">
                    <div className='sub'>
                    <div className="itemname">
                        <p><strong>Name:</strong> {data.strMeal}</p>
                        <p><strong>Tags:</strong> {data.strTags}</p>
                        <p><strong>Video Link:</strong> <a href={data.strYoutube} target="_blank" rel="noreferrer">Click here</a></p>
                    </div>
                    <img src={data.strMealThumb} alt={data.strMeal} style={{width:'300px',height:'300px',borderRadius:'50%',marginLeft:'0px'}}/>
                    </div>
                    <div className="ingredients">
                        <strong>Ingredients</strong>
    {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
        const ingredient = data[`strIngredient${index}`];
        const measure = data[`strMeasure${index}`];
        if (ingredient && measure) {
            return (
                <div key={index} className="ingredient-item">
                    <span className="ingredient-name"><strong>{ingredient}</strong></span>
                    <span className="ingredient-measure">{measure}</span>
                </div>
            );
        }
        return null;
    })}
</div>

                   <div className='desc'>
                    <strong>Description</strong>
                    <p>{data.strInstructions}</p>
                   </div>
                </div>
            )}
        </div>
    );
};

export default Reciepe;
