import React, { useEffect, useState } from "react";
import axios from "axios";
// import data from './data';
import "./css/cardmain.css";
import Navbar from './navbar';
import Footer from "./footer";
import Moviedetials from "./moviedetials";

const Movies = () => {
  const [movieList, setmovieList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getmoviedetials")
      .then((res) => {
        setmovieList(res.data.documents);
      })
      .catch((error) => {
        console.error("Error fetching anime data:", error);
      });
  }, []);
  document.body.style.backgroundColor = "lightgrey";

  return (
    <div>
      <Navbar/>
      <div className="header">
        <h1>WATCH AND ENJOY</h1>
      </div><br/>
      <div className="card-container">
        {movieList.map((val) => (
          <Moviedetials key={val.id} products={val} />
        ))}
      </div><br/><br/>
      <Footer/>
    </div>
  );
}

export default Movies

