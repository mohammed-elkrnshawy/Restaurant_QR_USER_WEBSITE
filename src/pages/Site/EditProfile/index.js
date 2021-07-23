import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

const Index = () => {
  const history = useHistory();

  return (
    <div className="editContainer">
      <div className="editContent">
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={localStorage.getItem('name')}
          />
          <input
            type="text"
            name="mobileNum"
            placeholder="Mobile Number"
            defaultValue={localStorage.getItem('phone')}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={localStorage.getItem('email')}
          />

          <input
            type="submit"
            value="Save"
            onClick={(e) => {
              e.preventDefault();
              history.push('/home');
            }}
          />
        </form>
        <div className="line" />

        <form>
          <h3
            style={{
              marginBottom: 19,
            }}
          >
            Change Password
          </h3>

          <input
            type="password"
            name="currentPass"
            id="password"
            placeholder="Current Password"
          />
          <input
            type="password"
            id="password"
            name="newPass"
            placeholder="New Password"
          />
          <input
            type="password"
            id="password"
            name="repPass"
            placeholder="Repeat Password"
          />

          <input
            className="changePass"
            value="Change Password"
            onClick={(e) => {
              e.preventDefault();
              history.push('/home');
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Index;
