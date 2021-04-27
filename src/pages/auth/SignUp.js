import React from 'react';

export const SignUp = () => {
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
          <h5>Sign Up</h5>
          <p>Please fill in the information to sign up</p>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="email" placeholder="E-mail" />

          <input type="text" name="mobileNum" placeholder="Mobile Number" />

          <input type="password" name="password" placeholder="Password" />
          <input type="password" name="rpassword" placeholder="Password" />

          <input type="submit" value="Login" />

          <p className="signup">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
