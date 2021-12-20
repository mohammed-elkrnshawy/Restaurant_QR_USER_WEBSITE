import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Home from './Home';
import Details from './Details';

import Pages from '../index';

import Search from './Search';
import Landing from './LandingPage';

import MyReservations from './MyReservations';
import ContactUs from './ContactUs';
import EditProfile from './EditProfile';
import Nav from '../../common/Header';
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
  const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || 'en');
  const [name, setName] = useState('');

  const theComponent = () => {
    return (
      <Switch>
        <Route path="/home" exact component={Search} />
        <Route path="/home/about" exact component={Landing} />
        <Route path="/home/resturant/" exact component={Details} />
        <Route path="/home/edit-profile/" exact component={EditProfile} />
        <Route path="/home/contact-us/" exact component={ContactUs} />
        <Route path="/home/my-reservations" exact component={MyReservations} />
        <Route path="/login" exact component={Pages.Login} />

        <Redirect to="/home/about" />
      </Switch>
    );
  };
  return (
    <>
      <div className="">
        <BrowserRouter>
          <Nav setLang={setLang} />

          <div style={{ minHeight: '100vh' }}>{theComponent()}</div>
        </BrowserRouter>
      </div>

      <footer class="footer">
        <div class="footer__addr">
          <h1 class="footer__logo"></h1>

          <h2>Contact</h2>

          <address>
            5534 Somewhere In. The World 22193-10212
            <br />
            <a class="footer__btn" href="mailto:example@gmail.com">
              Email Us
            </a>
          </address>
        </div>

        <ul class="footer__nav">
          <li class="nav__item">
            <h2 class="nav__title">Media</h2>

            <ul class="nav__ul">
              <li>
                <a href="#">Online</a>
              </li>

              <li>
                <a href="#">Print</a>
              </li>

              <li>
                <a href="#">Alternative Ads</a>
              </li>
            </ul>
          </li>

          <li class="nav__item nav__item--extra">
            <h2 class="nav__title">Technology</h2>

            <ul class="nav__ul nav__ul--extra">
              <li>
                <a href="#">Hardware Design</a>
              </li>

              <li>
                <a href="#">Software Design</a>
              </li>

              <li>
                <a href="#">Digital Signage</a>
              </li>

              <li>
                <a href="#">Automation</a>
              </li>

              <li>
                <a href="#">Artificial Intelligence</a>
              </li>

              <li>
                <a href="#">IoT</a>
              </li>
            </ul>
          </li>

          <li class="nav__item">
            <h2 class="nav__title">Legal</h2>

            <ul class="nav__ul">
              <li>
                <a href="#">Privacy Policy</a>
              </li>

              <li>
                <a href="#">Terms of Use</a>
              </li>

              <li>
                <a href="#">Sitemap</a>
              </li>
            </ul>
          </li>
        </ul>

        <div class="legal">
          <p>&copy; 2019 Something. All rights reserved.</p>

          <div class="legal__links">
            <span>
              Made with <span class="heart">♥</span> remotely from Anywhere
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
