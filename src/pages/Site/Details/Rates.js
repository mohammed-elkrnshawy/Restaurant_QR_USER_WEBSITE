import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Button,
  Tab,
  Nav,
  Image,
  Badge,
} from 'react-bootstrap';
import RatingBar from '../../../common/RatingBar';
import Review from '../../../common/Review';
import StarRating from '../../../common/StarRating';

import axios from 'axios';
import cogoToast from 'cogo-toast';

export default function Rates({ rates, resturantId, getComments, rate }) {
  let [starsCout, setStarsCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    let values = {
      restaurant_id: resturantId,
      comment: e.target[0].value,
      rate: starsCout,
    };

    console.log(values);

    // cogoToast.loading('loading');
    axios
      .post('https://restaurant-dashboard.se01.tech/api/add_comment', values, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(function (response) {
        if (response.data.status == 'true') {
          getComments();
          cogoToast.success('request submitted');
        } else {
          cogoToast.warn('someting went wrong');
        }
      });
  };
  const getStarValue = ({ value }) => {
    setStarsCount(value);
    //console.log(quantity);
  };

  return (
    <div>
      {rates.length > 0 && resturantId > -1 ? (
        <>
          <div className="bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
            <h5 className="mb-0 mb-4">Ratings and Reviews</h5>
            <div className="graph-star-rating-header">
              <p className="text-black mb-4 mt-2">
                Rated {Math.floor(rate)} out of 5
              </p>
            </div>
            <div className="graph-star-rating-body">
              <RatingBar leftText="5 Star" barValue={56} />
              <RatingBar leftText="4 Star" barValue={23} />
              <RatingBar leftText="3 Star" barValue={11} />
              <RatingBar leftText="2 Star" barValue={6} />
              <RatingBar leftText="1 Star" barValue={4} />
            </div>
          </div>
          <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
            <h5 className="mb-4">Leave Comment</h5>
            <p className="mb-2">Rate the Place</p>
            <div className="mb-4">
              <div className="star-rating">
                <StarRating fontSize={26} star={5} getValue={getStarValue} />
              </div>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Your Comment</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
              <Form.Group>
                <Button variant="primary" size="sm" type="submit">
                  {' '}
                  Submit Comment{' '}
                </Button>
              </Form.Group>
            </Form>
          </div>
          <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
            <h5 className="mb-1">All Ratings and Reviews</h5>
            {rates.map((r) => (
              <>
                <Review
                  ImageAlt=""
                  ratingStars={r.rate}
                  Name="Singh Osahan"
                  profileLink="#"
                  reviewDate={new Date(r.created_at).toDateString()}
                  reviewText={r.comment}
                  otherUsers={[]}
                />
                <hr />
              </>
            ))}

            <hr />
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
