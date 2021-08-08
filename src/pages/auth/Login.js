import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './style.css';
import axios from 'axios';
import cogoToast from 'cogo-toast';
const Login = ({}) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target[0].value || !e.target[1].value) {
      cogoToast.warn('Please Fill All Info');
    } else {
      let values = {
        phone: e.target[0].value,
        password: e.target[1].value,
        token: '33',
        device: 'android',
      };

      axios
        .post(
          'https://restaurant-dashboard.se01.tech/api/auth/login',
          values,
          {}
        )
        .then(function (response) {
          if (response.data.status == 'true') {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('name', response.data.data.name);
            localStorage.setItem('email', response.data.data.email);
            localStorage.setItem('phone', response.data.data.phone);
            history.push('/home');
          } else {
            cogoToast.warn('Phone Or Password Is Wrong');
          }
        });
    }
  };
  return (
    <div className="container">
      <div
        className="panar"
        style={{
          backgroundImage: `url("/assets/bg.png")`,
        }}
      ></div>

      <div className="content">
        <form onSubmit={handleSubmit}>
          <h3>{t('Welcome To Our Resturent')}</h3>
          <h5>{t('Log In')}</h5>
          <br />
          <p>{t('Please fill in the information to login')}</p>

          <input
            type="text"
            name="mobileNum"
            className="loginPass"
            placeholder={t('Mobile Number')}
          />

          <input
            type="password"
            name="password"
            placeholder={t('Password')}
            className="loginPass"
          />
          <a>{t('Forget Password?')}</a>

          <input type="submit" value={t('Log In')} />

          <p className="signup">
            {t("Don't have an account?")}{' '}
            <a
              href="#"
              onClick={() => {
                window.location.assign('/auth/signup');
              }}
            >
              {t('Sign Up')}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
