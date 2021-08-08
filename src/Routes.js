import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Pages from './pages';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={Pages.SignUp} />
        <Route path="/login" component={Pages.Login} />
        <Route path="/home" component={Pages.Home} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
