import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Details from './Details';
import Meals from './meals';

import Search from './Search';
import MyReservations from './MyReservations';
import ContactUs from './ContactUs';
import EditProfile from './EditProfile';
import { Nav } from '../../Components/Nav';

const index = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/home/my-reservations" exact component={MyReservations} />
        <Route path="/home/edit-profile" exact component={EditProfile} />
        <Route path="/home/contact-us" exact component={ContactUs} />
        <Route path="/home/search" exact component={Search} />
        <Route path="/home" exact component={Home} />
        <Route path="/home/details" exact component={Details} />
        <Route path="/home/meals" exact component={Meals} />
      </Switch>
    </div>
  );
};

export default index;
