import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="content-container">
      <div className="header__title">
        <Link to="/">Coinsensus</Link>
      </div>
      <div className="ui medium header">
        <Link to="/login">Login</Link>
      </div>
      <div className="ui medium header">
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  </header>
);

export default Header;
