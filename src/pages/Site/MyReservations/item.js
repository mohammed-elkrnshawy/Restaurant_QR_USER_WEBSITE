import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

const Item = ({ data }) => {
  const history = useHistory();

  return (
    <div className="itemContainer">
      <div className="headerContainer">
        <div className="imageCont">
          <div
            className="img"
            style={{
              backgroundImage: `url("${data.restaurant_image}")`,
            }}
          ></div>
        </div>
        <div className="headerData">
          <h5>
            {data.name.substring(0, 10)}
            {data.name.length > 10 ? '...' : ''}
          </h5>
          <p className="number">#{data.id}</p>
        </div>
        <div className="headerDate">
          <p className="date">{data.date}</p>
          <p className="time">{data.time}</p>
        </div>
      </div>
      <div className="body">
        <p>{data.status}</p>
        <hr />
      </div>
    </div>
  );
};

export default Item;
