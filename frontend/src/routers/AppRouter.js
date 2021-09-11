import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddTradePage from '../components/AddTradePage';
import Dashboard from '../components/Dashboard';
import EditTradePage from '../components/EditTradePage';
import Header from '../components/Header';
import Login from '../components/Login';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/add" component={AddTradePage} />
        <Route path="/edit/:id" component={EditTradePage} />
        <Route componenet={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
