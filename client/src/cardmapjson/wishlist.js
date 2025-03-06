import React from 'react'
import { useState, useEffect } from 'react'
import './css/wishlist.css'
import Navbar from './navbar'

const Wishlist = () => {
    const [username, setUsername] = useState("");
    useEffect(() => {
            const User = localStorage.getItem("User");
            if (User) {
                setUsername(User);
            }
        }, []);
  return (
    <div className='wishlist'>
        <Navbar/>
        <div className="header">
            <h1>{username}      WatchList</h1>
        </div>
    </div>
  )
}

export default Wishlist