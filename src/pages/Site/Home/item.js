import React from 'react';
import { useHistory } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

import './style.css';

const Item = ({ onClick, name, image, rating }) => {
  const history = useHistory();

  return (
    <div className="homeitemContainer" onClick={onClick}>
      <div className="homeheaderContainer">
        <div className="homeimageCont">
          <div
            className="homeimg"
            style={{
              backgroundImage: `url("${image}")`,
            }}
          ></div>
        </div>
        <div className="homeheaderData">
          <h5>{name}</h5>
          <p className="hometype">
            <StarRatingComponent name="rate1" starCount={5} value={rating} />
          </p>

          {/* <p className="rate">
            {' '}
            <i class="star fas fa-star"></i>5.0
          </p> */}
        </div>
        {/* <div className="homestatus">
          <p className="homedata">new</p>
        </div> */}
      </div>
      <div className="homebody">
        <hr />
      </div>
    </div>
  );
};

export default Item;
