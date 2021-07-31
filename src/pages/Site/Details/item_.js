import React from 'react';
import { useHistory } from 'react-router-dom';
import './style_.css';

const Item = ({ onClick, name, image, price, description }) => {
  const history = useHistory();

  return (
    <div className="homeitemContainer" onClick={onClick}>
      <div className="homeheaderContainer">
        <div className="homeimageCont">
          <div
            className="homeimg"
            style={{
              backgroundImage: `url('${image}')`,
            }}
          ></div>
        </div>
        <div className="homeheaderData">
          <h5>{name}</h5>
          <p className="hometype">{description}</p>
        </div>
        <div className="mealstatus">
          <p
            style={{
              position: 'relative',
              top: 0,
              right: 0,
              color: '#15B2A2',
              fontSize: 12,
            }}
          >
            {price + '.SAR'}
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
