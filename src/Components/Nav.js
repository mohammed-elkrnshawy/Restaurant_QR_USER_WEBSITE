/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../translation/i18n';
import { Menu, Dropdown } from 'antd';
import { DownCircleFilled } from '@ant-design/icons';

import './style.css';

export const Nav = ({ changeComponent, currentComponent, setLang, name }) => {
  const { t } = useTranslation();
  let location = useLocation();
  let history = useHistory();
  const menu = (
    <Menu>
      <Menu.Item>
        <div className="nav-menu-item">
          <div className="icon-wrapper" style={{}}>
            <a
              onClick={() => {
                history.push('/home/edit-profile');
              }}
              style={{
                padding: 10,
              }}
              className={
                currentComponent == 'editProfile'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              {t('Edit Profile')}
            </a>{' '}
          </div>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="nav-menu-item">
          <div className="icon-wrapper" style={{}}>
            <a
              onClick={() => {
                history.push('/home/my-reservations');
              }}
              style={{
                padding: 10,
              }}
              className={
                currentComponent == 'myReservation'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              {t('My Reservation')}
            </a>
          </div>
        </div>
      </Menu.Item>

      <Menu.Item
        danger
        onClick={() => {
          localStorage.removeItem('token');
          window.location.reload();
          history.push('/home');
        }}
        style={{
          padding: 10,
        }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );

  // const history = useHistory();

  return (
    <header
      hidden={window.location.pathname.indexOf('login') > 0 ? true : false}
      className="header"
    >
      <nav className="navbar">
        <a href="/home" class="nav-logo">
          <img src="/assets/logo.svg"></img>
        </a>
        <ul class="nav-menu">
          <li class="nav-item">
            <a
              href="#"
              onClick={() => {
                history.push('/home');
              }}
              style={{
                padding: 5,
                color: currentComponent == 'home' ? '#15b2a2' : 'black',
              }}
              className={
                currentComponent == 'home' ? 'nav-link active' : 'nav-link'
              }
            >
              {t('Home')}
            </a>
          </li>

          <li class="nav-item">
            <Link
              style={{
                padding: 15,
              }}
              to="/home/contact-us"
              style={{
                padding: 5,
                color: currentComponent == 'contact' ? '#15b2a2' : 'black',
              }}
              className={
                currentComponent == ' contact' ? 'nav-link active' : 'nav-link'
              }
            >
              {t('Contact Us')}
            </Link>
          </li>

          <li class="nav-item">
            <a
              href="https://restaurant-dashboard.se01.tech/restaurants/create"
              target="_blank"
              className={
                currentComponent == ' contact' ? 'nav-link active' : 'nav-link'
              }
            >
              {t('Join Us')}
            </a>
          </li>

          <li class="nav-item">
            <a
              href="#"
              style={{
                padding: 5,
              }}
              className={
                currentComponent == ' contact' ? 'nav-link active' : 'nav-link'
              }
              onClick={() => {
                i18n.changeLanguage(
                  localStorage.getItem('lang') &&
                    localStorage.getItem('lang').includes('ar')
                    ? 'en'
                    : 'ar'
                );
                localStorage.setItem(
                  'lang',
                  localStorage.getItem('lang') &&
                    localStorage.getItem('lang').includes('ar')
                    ? 'en'
                    : 'ar'
                );
                document.body.dir = i18n.dir();

                setLang(localStorage.getItem('i18nextLng'));
                window.location.reload();
              }}
            >
              {localStorage.getItem('lang') &&
              localStorage.getItem('lang').includes('en')
                ? '??????????????'
                : 'EN'}
            </a>
          </li>
        </ul>
        {localStorage.getItem('token') ? (
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
              onClick={(e) => e.preventDefault()}
            >
              {localStorage.getItem('name') || 'Unregestered user'}
              <DownCircleFilled
                style={{
                  paddingInline: 10,
                  textDecoration: 'none',
                  color: 'red',
                  fontSize: 16,
                }}
              />
            </a>
          </Dropdown>
        ) : (
          <Link
            style={{
              padding: 15,
            }}
            to={`/login`}
          >
            <i class="fas fa-sign-in-alt"></i> {t('login')}
          </Link>
        )}
      </nav>
    </header>
  );
};
