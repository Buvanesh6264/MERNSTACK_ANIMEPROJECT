import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Carddata from './cardmapjson/carddata';
import Card from './cardmapjson/card';
import Info from './cardmapjson/info';
import Loginpage from './cardmapjson/loginpage'
import Signuppage from './cardmapjson/signuppage'
import NotFound from './NotFound';
import Homepage from './cardmapjson/homepage';
import Profile from './cardmapjson/profile';
import Wishlist from './cardmapjson/wishlist';
import Movieinfo from './cardmapjson/movieinfo';
import Movies from './cardmapjson/movies';

function Mainparent(){
  return (
    <div>
        <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path='/home' element={<Homepage/>}/>
            <Route path="/Signuppage" element={<Signuppage />} />
            <Route path="/animepage" element={<Card />} />
            <Route path="/animeinfo" element={<Info/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/Carddata" element={<Carddata/>} />
            <Route path="/WatchList" element={<Wishlist />} />
            <Route path="/moviepage" element={<Movies />} />
            <Route path="/movieinfo" element={<Movieinfo/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default Mainparent ;