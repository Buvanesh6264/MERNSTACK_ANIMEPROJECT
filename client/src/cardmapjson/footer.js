import React from "react";
import "./css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} MYANIME. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/animepage">Anime</a></li>
          <li><a href="/moviepage">Movie</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/WatchList">Watchlist</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
