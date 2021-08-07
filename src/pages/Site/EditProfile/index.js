import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import cogoToast from 'cogo-toast';

const Index = ({ setName }) => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      name: e.target.name.value,
      phone: e.target.mobileNum.value,
      email: e.target.email.value,
    };

    axios
      .post('https://restaurant-dashboard.se01.tech/api/update-profile', data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(function (response) {
        if (response.data.status == 'true') {
          setName(response.data.data.name);
          localStorage.setItem('name', response.data.data.name);
          localStorage.setItem('email', response.data.data.email);
          localStorage.setItem('phone', response.data.data.phone);
          cogoToast.success('Edited Successfuly');
        } else {
          cogoToast.warn('Phone Or Password Is Wrong');
        }
      });
    console.log(data);
  };

  return (
    <div className="editContainer">
      <div className="editContent">
        <form onSubmit={handleSubmit}>
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

          <input type="submit" value="Save" />
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
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Index;
