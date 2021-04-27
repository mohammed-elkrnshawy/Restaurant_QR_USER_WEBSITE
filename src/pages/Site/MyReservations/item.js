import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

const Item = () => {
  const history = useHistory();

  return (
    <div className="itemContainer">
      <div className="headerContainer">
        <div className="imageCont">
          <div
            className="img"
            style={{
              backgroundImage: `url("/assets/mac.png")`,
            }}
          ></div>
        </div>
        <div className="headerData">
          <h5>Mc Donald's</h5>
          <p className="number">#78798798</p>
        </div>
        <div className="headerDate">
          <p className="date">12-12-1200</p>
          <p className="time">11:2 PM</p>
        </div>
      </div>
      <div className="body">
        <p>
          lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem{' '}
          lorem lorem
        </p>
        <hr />
      </div>
    </div>
  );
};

export default Item;
