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
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', mobileMenu);

    function mobileMenu() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    }
  }, []);

  const jsfunc = () => {};

  return (
    <header class="header">
      <nav class="navbar">
        <a href="#" class="nav-logo">
          <img src="/assets/logo.svg"></img>
        </a>
        <ul class="nav-menu">
          <li class="nav-item">
            <a
              href="#"
              onClick={() => {
                changeComponent('home');
              }}
              className={
                currentComponent == 'home' ? 'nav-link active' : 'nav-link'
              }
            >
              Home
            </a>
          </li>
          <li class="nav-item">
            <a
              onClick={() => {
                changeComponent('myReservation');
              }}
              className={
                currentComponent == 'myReservation'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              My Reservation
            </a>
          </li>
          <li class="nav-item">
            <a
              onClick={() => {
                changeComponent('editProfile');
              }}
              className={
                currentComponent == 'editProfile'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              Edit Profile
            </a>
          </li>
          <li class="nav-item">
            <a
              onClick={() => {
                changeComponent('contact');
              }}
              className={
                currentComponent == ' contact' ? 'nav-link active' : 'nav-link'
              }
            >
              Contact Us
            </a>
          </li>
          <li class="nav-item">
            <a
              href="https://restaurant-dashboard.se01.tech/restaurants/create"
              className={
                currentComponent == ' contact' ? 'nav-link active' : 'nav-link'
              }
            >
              Join Us
            </a>
          </li>
          <li
            onClick={() => {
              localStorage.removeItem('token');

              changeMainComponent('login');
            }}
            className="nav-item"
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
        <ul class="nav-menu"></ul>
        <div
          class="hamburger"
          onClick={() => {
            jsfunc();
          }}
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </nav>
    </header>
  );
};
