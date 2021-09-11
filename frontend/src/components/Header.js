import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Coinsensus</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Login
    </NavLink>
    <NavLink to="/dashboard" activeClassName="is-active">
      Dashboard
    </NavLink>
    <NavLink to="/add" activeClassName="is-active">
      Add
    </NavLink>
  </header>
);

export default Header;
