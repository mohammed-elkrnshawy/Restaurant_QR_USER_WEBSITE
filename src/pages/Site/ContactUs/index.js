import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import './style.css';
import { useTranslation } from 'react-i18next';
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

const Index = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    let values = {
      name: e.target[0].value,
      phone: e.target[1].value,
      message: e.target[2].value,
    };
    console.log(values);

    // axios
    //   .post('https://restaurant-dashboard.se01.tech/api/contact', values, {
    //     headers: {
    //       authorization: `Bearer ${localStorage.getItem('token')}`,
    //     },
    //   })
    //   .then(function (response) {
    //     if (response.data.status == 'true') {
    //       cogoToast.success('request submitted');
    //     } else {
    //       cogoToast.warn('someting went wrong');
    //     }
    //   });
  };

  return (
    <Container>
      <div className="bg-white rounded shadow-sm p-4 mb-5 mt-5 rating-review-select-page">
        <h5 className="mb-4">Leave Comment</h5>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Your Comment</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Form.Group>
            <Button variant="primary" size="sm" type="submit">
              {' '}
              Submit{' '}
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default Index;
