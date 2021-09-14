import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="content-container">
      <h3 className="header__title">Coinsensus</h3>
      <Link to="/">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/add">Add</Link>
    </div>
  </header>
);

export default Header;
