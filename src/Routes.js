import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Pages from './pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/signup" exact component={Pages.SignUp} />
      <Route path="/login" exact component={Pages.Login} />
      <Route path="/home" exact component={Pages.Home} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default Routes;
