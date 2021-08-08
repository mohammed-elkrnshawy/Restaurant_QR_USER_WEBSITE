import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Home from './Home';
import Details from './Details';

import Pages from '../index';

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
  const [path, setPath] = useState('');
  const [lang, setLang] = useState('');
  const [name, setName] = useState('');

  const theComponent = () => {
    return (
      <Switch>
        <Route path="/home" exact component={Search} />
        <Route path="/home/resturant-details/" exact component={Details} />
        <Route path="/home/edit-profile/" exact component={EditProfile} />
        <Route path="/home/contact-us/" exact component={ContactUs} />
        <Route path="/home/my-reservations" exact component={MyReservations} />

        <Redirect to="/home" />
      </Switch>
    );
  };
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default Index;
