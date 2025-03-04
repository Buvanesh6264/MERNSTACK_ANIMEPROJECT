import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './homepage.css';

const Homepage = () => {
    const [username, setUsername] = useState("");
    const [trendingAnime, setTrendingAnime] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const User = localStorage.getItem("User");
        if (User) {
            setUsername(User);
        }
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/getanimedetials")
            .then(response => {
                setTrendingAnime(response.data.documents.slice(0, 4));
            })
            .catch(error => console.error('Error fetching anime:', error));
    }, []);

    const animepage = () => {
        navigate("/animepage");
    };

    return (
        <div className="homepage">
            <Navbar />
            <div className="header">
                <h1>Welcome to My Anime Page{username && `, ${username}`}</h1>
                <p>Explore the world of anime and discover new favorites!</p>
                <button onClick={animepage} className='btn'>Explore More</button>
            </div>
            <div className="trending-section">
                <h2>Trending Anime</h2>
                <div className="anime-list">
                    {trendingAnime.map((anime, index) => (
                        <div key={index} className="anime-card">
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
