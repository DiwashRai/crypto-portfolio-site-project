import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Home from '../components/Home';
import Login from '../components/Login';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Fragment>
          <Header />
          <Route path="/" component={Home} exact={true} />
          <Route path="/dashboard" component={Dashboard} />
          <Route componenet={NotFoundPage} />
        </Fragment>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
