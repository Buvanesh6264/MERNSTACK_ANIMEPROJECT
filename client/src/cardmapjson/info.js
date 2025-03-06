import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import "./css/info.css";
// import "./card.css";
// import animeInfo from "./data";

function Info() {
  const location = useLocation();
  const animeId = location.state?.anime?.id;
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getssingleanimebyid/${animeId}`)
      .then((res) => setAnime(res.data))
      .catch((error) => console.error("Error fetching anime details:", error));
  }, [animeId]);

  if (!anime) {
    return <h1 style={{ textAlign: "center" }}>No anime data available</h1>;
  }

  return (
    <>
      <Navbar />
      
      <div className={showModal ? "blur-background" : ""}>
        <div className="anime-banner">
          <div className="overlay"></div>
          <img
            className="background-image"
            src={anime.image}
            alt="Background"
          />
          <div className="anime-content">
            <div className="anime-poster">
              <img src={anime.image} alt={anime.title} />
            </div>
            <div className="anime-info">
              <h1 className="anime-title">{anime.title}</h1><br/><br/>
              <p><strong>Episodes:</strong> {anime.episodes}</p><br/>
              <p><strong>Genres:</strong> {anime.genre.join(", ")}</p><br/>
              <p><strong>Description:</strong> {anime.description}</p><br/><br/>
              <div className="anime-actions">
                {anime.watchLink && (
                  <a href={anime.watchLink} target="_blank" rel="noopener noreferrer">
                    <button className="play-button">▶ Watch Anime</button>
                  </a>
                )}
                <button onClick={() => navigate("/animepage")} className="list-button">
                  Anime page
                </button>
              </div>
            </div>
          </div>
        </div>

        <button className="watch-trailer" onClick={() => setShowModal(true)}>
        ▶  Watch Trailer
        </button>

        <h1 className="character-heading">Characters</h1>
        <div className="character-container">
          {anime.character && anime.character.length > 0 ? (
            anime.character.map((char, index) => (
              <div key={index} className="card-info">
                <img 
                  src={char.image} 
                  alt={char.name} 
                  className="card-img" 
                />
                <h2 className="card-title">{char.name}</h2>
                {char.character && <h3 className="card-role">{char.character}</h3>}
              </div>
            ))
          ) : (
            <p>No characters found</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* console.log("anime.trailer",{anime.trailer}); */}
            <h1 className="anime-title">{anime.title}</h1><br/>
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <iframe 
              src={anime.trailer.replace("watch?v=", "embed/")}  
              title="Anime Trailer" 
              allowFullScreen
            ></iframe>
            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/QczGoCmX-pI?si=VRO02JCupa2a2U4c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

          </div>
        </div>
      )}
    </>
  );
}

export default Info;
