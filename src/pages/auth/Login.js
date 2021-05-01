import React from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';
import axios from 'axios';
import cogoToast from 'cogo-toast';
const Login = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target[0].value || !e.target[1].value) {
      cogoToast.warn('Please Fill All Info');
    } else {
      let values = {
        phone: e.target[0].value,
        password: e.target[1].value,
        token: '33',
      };

      axios
        .post('https://restaurant.se01.tech/api/auth/login', values)
        .then(function (response) {
          if (response.data.status == 'true') {
            console.log(response);

            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('name', response.data.data.name);
            localStorage.setItem('email', response.data.data.email);
            localStorage.setItem('phone', response.data.data.phone);

            history.push('/home');
          } else {
            console.log(response);
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
          <h3>Welcome To Our Resturent</h3>
          <h5>Log In</h5>
          <p>Please fill in the information to login</p>

          <input type="text" name="mobileNum" placeholder="Mobile Number" />

          <input type="password" name="password" placeholder="Password" />
          <a>Forget Password?</a>

          <input type="submit" value="Login" />

          <p className="signup">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
