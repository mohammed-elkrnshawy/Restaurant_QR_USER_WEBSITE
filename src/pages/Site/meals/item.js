import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

const Item = ({ onClick }) => {
  const history = useHistory();

  return (
    <div className="homeitemContainer" onClick={onClick}>
      <div className="homeheaderContainer">
        <div className="homeimageCont">
          <div
            className="homeimg"
            style={{
              backgroundImage: `url("/assets/mac.png")`,
            }}
          ></div>
        </div>
        <div className="homeheaderData">
          <h5>Lorem Ipsum</h5>
          <p className="hometype">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been{' '}
          </p>
        </div>
        <div className="mealstatus">
          <p
            style={{
              position: 'relative',
              top: 0,
              right: 0,
              color: '#15B2A2',
            }}
          >
            $25
          </p>
        </div>
      </div>
      <div className="homebody">
        <hr />
      </div>
    </div>
  );
};

export default Item;
