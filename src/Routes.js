import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Pages from './pages';

const Routes = () => {
  return (
    <>
      {localStorage.getItem('token') &&
      localStorage.getItem('token').length > 9 ? (
        <Switch>
          <Route path="/" exact component={Pages.Home} />
          <Route path="/login" exact component={Pages.Login} />

          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/signup" exact component={Pages.SignUp} />
          <Route path="/login" exact component={Pages.Login} />
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  );
};

export default Routes;
