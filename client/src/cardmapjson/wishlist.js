import React, { useState, useEffect} from "react";
import axios from "axios";
import "./css/wishlist.css";
import Navbar from "./navbar";
import { useNavigate } from 'react-router-dom';
import Footer from "./footer";


const Wishlist = () => {
  const [username, setUsername] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  const [deleted, setdeleted] = useState(false);

  useEffect(() => {
    const User = localStorage.getItem("User");
    if (User) {
      setUsername(User);
      fetchWatchlist(User);
    }
    console.log(watchlist);
  }, []);
  useEffect(() => {
    if (deleted) {
        if (username) {
        fetchWatchlist(username);
        setdeleted(false);
        }
    }
  },[deleted]);
  const fetchWatchlist = (user) => {
    axios
      .get(`http://localhost:3001/getwatchlist/${user}`)
      .then((res) => {
        if (res.data.error) {
          console.error(res.data.error);
        } else {
          setWatchlist(res.data.watchlist);
        }
        console.log(res.data.watchlist);
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error);
      });
  };
  const removeFromWatchlist = (animeId) => {
    axios
      .post("http://localhost:3001/removewatchlist", { animeId, username })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert("Anime removed from watchlist!");
          fetchWatchlist();
        }
      })
      .catch((error) => console.error("Error removing from watchlist:", error));
  };
  const moreinfo = (anime) => {
    navigate("/animeinfo", { state: { anime } });
};
  return (
    <div className="wishlist">
      <Navbar />
      <div className="header">
        <h1>{username}'s Watchlist</h1>
      </div>
      <div className="watchlist-container">
        {watchlist.length > 0 ? (
          watchlist.map((anime) => (
            <div key={anime.id} className="anime-item" onClick={() => moreinfo(anime)}>
                <img src={anime.image} alt={anime.title} className="anime-image" />
                <h3>{anime.title}</h3><br/>
                <button className="removeanime" onClick={(e) => { e.stopPropagation(); removeFromWatchlist(anime.id); setdeleted(true);}}>
                    Remove From Watchlist
                </button>
            </div>
          ))
        ) : (
          <p className="empty">Your watchlist is empty.</p>
        )}
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Wishlist;
