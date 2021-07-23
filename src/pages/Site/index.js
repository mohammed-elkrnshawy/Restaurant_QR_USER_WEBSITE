import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Details from './Details';

import Search from './Search';
import MyReservations from './MyReservations';
import ContactUs from './ContactUs';
import EditProfile from './EditProfile';
import { Nav } from '../../Components/Nav';

const Index = ({ changeMainComponent }) => {
  const [currentComponent, setCurrentComponent] = useState('home');
  const [id, setId] = useState(0);
  const [lang, setLang] = useState('');

  useEffect(() => {
    setLang(localStorage.getItem('i18nextLng'));
  }, []);

  const theComponent = () => {
    switch (currentComponent) {
      case 'home':
        return <Home changeComponent={setCurrentComponent} setId={setId} />;
      case 'details':
        return (
          <Details changeComponent={setCurrentComponent} id={id} lang={lang} />
        );

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
        changeMainComponent={changeMainComponent}
        changeComponent={setCurrentComponent}
        currentComponent={currentComponent}
        setLang={setLang}
      />
      {theComponent()}
    </>
  );
};

export default Index;
