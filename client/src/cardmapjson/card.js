import React, { useEffect, useState } from "react";
import axios from "axios";
import Carddata from './carddata';
// import data from './data';
import "./cardmain.css";
import Navbar from './navbar';

function Card() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getanimedetials")
      .then((res) => {
        setAnimeList(res.data.documents);
      })
      .catch((error) => {
        console.error("Error fetching anime data:", error);
      });
  }, []);
  document.body.style.backgroundColor = "lightgrey";

  return (
    <div className=".cardmain">
      <Navbar/>
      <div className="header">
        <h1>WATCH AND ENJOY</h1>
      </div><br/>
      <div className="card-container">
        {animeList.map((val) => (
          <Carddata key={val.id} products={val} />
        ))}
      </div>
    </div>
  );
}

export default Card;
