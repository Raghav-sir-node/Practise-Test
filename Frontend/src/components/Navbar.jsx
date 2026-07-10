import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout, cartItems } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login'); // Redirect to login page after logout
  }
  return (
    <nav className='navbar'>

      <div className="navbar_brand">
        <Link to="/">
          <img src="./logo.jpeg" alt="MyApp" className="navbar_logo" />My App
        </Link>
      </div>

      <ul className="navbar_links">
        <li><Link to="/shop">shop</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
        {
          user ?
            <>
              <li><Link to="/profile">Hi, {user.name}</Link></li>
              {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
              <li><button onClick={handleLogout}>Logout</button></li>
            </> :
            (<li><Link to="/login">Login</Link></li>)
        }
      </ul>

    </nav>
  );
}

export default Navbar;