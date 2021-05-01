import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

export const Nav = ({
  changeComponent,
  currentComponent,
  changeMainComponent,
}) => {
  const history = useHistory();
  useEffect(() => {
    console.log(currentComponent);
  }, []);

  return (
    <header class="header">
      <h1 class="logo">
        <img src="/assets/logo.svg"></img>
      </h1>
      <ul class="main-nav">
        <li className={currentComponent == 'home' ? 'active' : ''}>
          <a
            onClick={() => {
              changeComponent('home');
            }}
            className={currentComponent == 'home' ? 'active' : ''}
          >
            Home
          </a>
        </li>
        <li className={currentComponent == 'myReservation' ? 'active' : ''}>
          <a
            onClick={() => {
              changeComponent('myReservation');
            }}
            className={currentComponent == 'myReservation' ? 'active' : ''}
          >
            My Reservation
          </a>
        </li>
        <li className={currentComponent == 'editProfile' ? 'active' : ''}>
          <a
            onClick={() => {
              changeComponent('editProfile');
            }}
            className={currentComponent == 'editProfile' ? 'active' : ''}
          >
            Edit Profile
          </a>
        </li>
        <li className={currentComponent == 'contact' ? 'active' : ''}>
          <a
            onClick={() => {
              changeComponent('contact');
            }}
            className={currentComponent == 'contact' ? 'active' : ''}
          >
            Contact Us
          </a>
        </li>
      </ul>
      <ul class="main-nav">
        <li
          onClick={() => {
            localStorage.removeItem('token');

            changeMainComponent('login');
          }}
        >
          <i
            class="logout fas fa-sign-out-alt"
            onClick={() => {
              localStorage.removeItem('token');
              changeMainComponent('login');
            }}
          ></i>

          <p className="userName"> {localStorage.getItem('name')}</p>
        </li>
      </ul>
    </header>
  );
};
