import React from 'react';
import { useNavigate } from "react-router-dom";
import "./css/card.css";

function Moviedetials({ products }) {
  const navigate = useNavigate();
  const moreinfo = () => {
    navigate("/movieinfo", { state: { anime: { id: products.id } } }); 
  };
  return (
    <div className='card' onClick={moreinfo}>
      <img src={products.image} alt={products.title} className='card-img'/>
      <h2 className='card-title'>{products.title}</h2>
      <h3 className='card-episodes'>Duration:{` ${products.duration} min`}</h3>
      {/* <button className='card-button' id={products.title} onClick={moreinfo}>More Info</button>       */}
    </div>
  );
}

export default Moviedetials;
