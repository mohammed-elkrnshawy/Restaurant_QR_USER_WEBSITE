import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Details from './Details';

import Search from './Search';
import MyReservations from './MyReservations';
import ContactUs from './ContactUs';
import EditProfile from './EditProfile';
import { Nav } from '../../Components/Nav';

const Index = () => {
  const [currentComponent, setCurrentComponent] = useState('home');
  const [id, setId] = useState(0);

  // return (
  //   <div>
  //     <Nav />
  //     <Switch>
  //       <Route path="/home/my-reservations" exact component={MyReservations} />
  //       <Route path="/home/edit-profile" exact component={EditProfile} />
  //       <Route path="/home/contact-us" exact component={ContactUs} />
  //       <Route path="/home/search" exact component={Search} />
  //       <Route path="/home" exact component={Home} />
  //       <Route path="/home/details" exact component={Details} />
  //       <Route path="/home/meals" exact component={Meals} />
  //       <Redirect to="/home" />
  //     </Switch>
  //   </div>
  // );
  const theComponent = () => {
    switch (currentComponent) {
      case 'home':
        return <Home changeComponent={setCurrentComponent} setId={setId} />;
      case 'details':
        return <Details changeComponent={setCurrentComponent} id={id} />;

      case 'search':
        return <Search changeComponent={setCurrentComponent} />;
      case 'myReservation':
        return <MyReservations changeComponent={setCurrentComponent} />;
      case 'contact':
        return <ContactUs changeComponent={setCurrentComponent} />;
      case 'editProfile':
        return <EditProfile changeComponent={setCurrentComponent} />;

      default:
        return <Home changeComponent={setCurrentComponent} />;
    }
  };
  return (
    <>
      <Nav
        changeComponent={setCurrentComponent}
        currentComponent={currentComponent}
      />
      {theComponent()}
    </>
  );
};

export default Index;
