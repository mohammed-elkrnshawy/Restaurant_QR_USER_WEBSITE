import React from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

const Login = () => {
  const history = useHistory();
  return (
    <div className="container">
      <div
        className="panar"
        style={{
          backgroundImage: `url("/assets/bg.png")`,
        }}
      ></div>
      <div className="content">
        <form>
          <h3>Welcome To Our Resturent</h3>
          <h5>Log In</h5>
          <p>Please fill in the information to login</p>

          <input type="text" name="mobileNum" placeholder="Mobile Number" />

          <input type="password" name="password" placeholder="Password" />
          <a>Forget Password?</a>

          <input
            type="submit"
            value="Login"
            onClick={(e) => {
              e.preventDefault();
              history.push('/home');
            }}
          />

          <p className="signup">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
