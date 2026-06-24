import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar_brand">
        <Link to="/">
          <img src="./logo.png" alt="MyApp" className="navbar_logo" />MyApp</Link>
      </div>
      <ul className="navbar_links">
        <li><Link to="/shop">shop</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;