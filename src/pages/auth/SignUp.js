import React from 'react';

import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SignUp = ({ changeMainComponent }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[3].value != e.target[4].value) {
      cogoToast.warn('Password dose not match');
    } else if (
      !e.target[0].value ||
      !e.target[1].value ||
      !e.target[2].value ||
      !e.target[3].value
    ) {
      cogoToast.warn('Please Fill All Info');
    } else {
      let values = {
        name: e.target[0].value,
        email: e.target[1].value,
        phone: e.target[2].value,
        password: e.target[3].value,
        device: 'web',
      };

      axios
        .post(
          'https://restaurant-dashboard.se01.tech/api/auth/register',
          values
        )
        .then(function (response) {
          if (response.data.status == 'true') {
            cogoToast.success('regestered successfuly');

            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('name', response.data.data.name);

            changeMainComponent('home');
          } else {
            cogoToast.warn(response.data.message);
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
          <h5>{t('Sign Up')}</h5>
          <br />
          <p>{t('Please fill in the information to login')}</p>
          <input
            type="text"
            name="name"
            className="loginPass"
            placeholder={t('Name')}
            required
          />
          <input
            type="text"
            name="email"
            className="loginPass"
            placeholder={t('E-mail')}
            required
          />

          <input
            type="text"
            name="mobileNum"
            placeholder={t('Mobile Number')}
            className="loginPass"
            required
          />

          <input
            type="password"
            name="password"
            placeholder={t('Password')}
            className="loginPass"
            required
          />
          <input
            type="password"
            name="rpassword"
            className="loginPass"
            placeholder={t('Password')}
            required
          />

          <input type="submit" value={t('Sign Up')} />

          <p className="signup">
            {t('Already have an account?')}{' '}
            <a
              href="#"
              onClick={() => {
                changeMainComponent('login');
              }}
            >
              {t('Log In')}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
