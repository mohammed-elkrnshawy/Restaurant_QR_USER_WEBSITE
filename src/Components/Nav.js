import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

export const Nav = (props) => {
  const history = useHistory();
  useEffect(() => {
    console.log(history.location.pathname);
  }, []);

  return (
    <header class="header">
      <h1 class="logo">
        <img src="/assets/logo.svg"></img>
      </h1>
      <ul class="main-nav">
        <li className={history.location.pathname == '/home' ? 'active' : ''}>
          <a
            href="/home"
            className={history.location.pathname == '/home' ? 'active' : ''}
          >
            Home
          </a>
        </li>
        <li
          className={
            history.location.pathname == '/home/my-reservations' ? 'active' : ''
          }
        >
          <a
            href="/home/my-reservations"
            className={
              history.location.pathname == '/home/my-reservations'
                ? 'active'
                : ''
            }
          >
            My Reservation
          </a>
        </li>
        <li
          className={
            history.location.pathname == '/home/edit-profile' ? 'active' : ''
          }
        >
          <a
            href="/home/edit-profile"
            className={
              history.location.pathname == '/home/edit-profile' ? 'active' : ''
            }
          >
            Edit Profile
          </a>
        </li>
        <li
          className={
            history.location.pathname == '/home/contact-us' ? 'active' : ''
          }
        >
          <a
            href="/home/contact-us"
            className={
              history.location.pathname == '/home/contact-us' ? 'active' : ''
            }
          >
            Contact Us
          </a>
        </li>
      </ul>
      <ul class="main-nav">
        <li>
          <i
            class="logout fas fa-sign-out-alt"
            onClick={() => {
              history.push('/login');
            }}
          ></i>

          <p className="userName"> User Name</p>
        </li>
      </ul>
    </header>
  );
};
