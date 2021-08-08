/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../translation/i18n';
import { Menu, Dropdown } from 'antd';
import { DownCircleFilled } from '@ant-design/icons';

import './style.css';

export const Nav = ({ changeComponent, currentComponent, setLang, name }) => {
  const { t } = useTranslation();
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
    <header className="header">
      <nav className="navbar">
        <a href="#" class="nav-logo">
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

          {/* <li class="nav-item">
            <a
              style={{
                padding: 15,
                color: currentComponent == 'search' ? '#15b2a2' : 'black',
              }}
              onClick={() => {
                changeComponent('search');
              }}
              className={
                currentComponent == 'search' ? 'nav-link active' : 'nav-link'
              }
            >
              <i class="fas fa-search"></i>
            </a>
          </li> */}

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
                ? 'العربية'
                : 'EN'}
            </a>
          </li>
          {/* <li onClick={() => {}} className="nav-item">
            {localStorage.getItem('token') ? (
              <Dropdown overlay={menu}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {localStorage.getItem('name') || 'Unregestered user'}

                  <DownOutlined />
                </a>
              </Dropdown>
            ) : (
              <li class="nav-item">
                <a
                  style={{
                    padding: 15,
                  }}
                  onClick={() => {
                    changeMainComponent('login');
                  }}
                  className={
                    currentComponent == ' contact'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                >
                  <i class="fas fa-sign-in-alt"></i> {t('login')}
                </a>
              </li>
            )}
          </li>*/}
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
          <a
            style={{
              padding: 15,
            }}
            onClick={() => {
              window.location.assign('/auth/login');
            }}
            className={
              currentComponent == ' contact' ? 'nav-link active' : 'nav-link'
            }
          >
            <i class="fas fa-sign-in-alt"></i> {t('login')}
          </a>
        )}
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
