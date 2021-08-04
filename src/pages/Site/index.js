import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Details from './Details';

import Search from './Search';
import MyReservations from './MyReservations';
import ContactUs from './ContactUs';
import EditProfile from './EditProfile';
import { Nav } from '../../Components/Nav';
import './style.css';
import { Layout } from 'antd';
import {
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled,
  WhatsAppOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const Index = ({ changeMainComponent }) => {
  const [currentComponent, setCurrentComponent] = useState('home');
  const [id, setId] = useState(0);
  const [lang, setLang] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setLang(localStorage.getItem('i18nextLng'));
    setName(localStorage.getItem('name'));
  }, []);

  const theComponent = () => {
    switch (currentComponent) {
      case 'home':
        return (
          <Search changeComponent={setCurrentComponent} setId={setId} id={id} />
        );
      case 'details':
        return (
          <Details changeComponent={setCurrentComponent} id={id} lang={lang} />
        );

      case 'myReservation':
        return <MyReservations changeComponent={setCurrentComponent} />;
      case 'contact':
        return <ContactUs changeComponent={setCurrentComponent} />;
      case 'editProfile':
        return (
          <EditProfile
            changeComponent={setCurrentComponent}
            setName={setName}
          />
        );

      default:
        return <Home changeComponent={setCurrentComponent} />;
    }
  };
  return (
    <>
      <div className="indexcontainer">
        <Nav
          changeMainComponent={changeMainComponent}
          changeComponent={setCurrentComponent}
          currentComponent={currentComponent}
          setLang={setLang}
          name={name}
        />
        <div className="subcontainer">{theComponent()}</div>
      </div>
      <Footer style={{ textAlign: 'center' }}>
        <FacebookFilled style={{ fontSize: 30, marginInline: 5 }} />
        <WhatsAppOutlined style={{ fontSize: 30, marginInline: 5 }} />
        <InstagramFilled style={{ fontSize: 30, marginInline: 5 }} />
        <TwitterCircleFilled
          style={{ fontSize: 30, marginInline: 5, marginBlock: 20 }}
        />

        <h4>Resturants ©2021 Created by -------</h4>
      </Footer>
    </>
  );
};

export default Index;
