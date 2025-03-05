import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './homepage.css';

const Homepage = () => {
    const [username, setUsername] = useState("");
    const [trendingAnime, setTrendingAnime] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const backgroundImages = [
        require("./images/carousel1.jpg"),
        require("./images/carousel2.png"),
        require("./images/carousel3.jpg"),
        require("./images/carousel4.png")

    ];
    const navigate = useNavigate();

    useEffect(() => {
        const User = localStorage.getItem("User");
        if (User) {
            setUsername(User);
        }
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/gettrendinganime")
            .then(response => {
                setTrendingAnime(response.data.documents);
            })
            .catch(error => console.error('Error fetching anime:', error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % trendingAnime.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [trendingAnime]);

    const animepage = () => {
        navigate("/animepage");
    };
    const moreinfo = (anime) => {
        navigate("/animeinfo", { state: { anime } });
    };
    
    return (
        <div className="homepage">
            <Navbar />
            <div className='first-box' style={{
                backgroundImage: `url(${backgroundImages[currentIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in-out'
            }}>
                <div className="header">
                    <h1>Welcome to My Anime Page{username && `, ${username}`}</h1>
                    <p>Explore the world of anime and discover new favorites!</p>
                    <button onClick={animepage} className='btn'>Explore More</button>
                </div>
            </div>
            <div className="trending-section">
                <h2>Trending Anime</h2>
                <div className="anime-list">
                    {trendingAnime.map((anime, index) => (
                        <div key={index} className="anime-card" onClick={() => moreinfo(anime)}>
                            <img src={require(`./images/${anime.image}`)} alt={anime.title} />
                            <h3>{anime.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Homepage;