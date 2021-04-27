import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

const Index = () => {
  const history = useHistory();

  return (
    <div className="contactusContainer">
      <div className="contactusContent">
        <form>
          <h3>Leave Us A Message</h3>
          <p>Please fill in the information to complete request</p>

          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="mobileNum" placeholder="Mobile Number" />

          <textarea name="mesage" placeholder="Message"></textarea>

          <input
            type="submit"
            value="Send"
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
