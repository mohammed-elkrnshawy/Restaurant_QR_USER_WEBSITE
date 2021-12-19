import React, { useEffect } from 'react';
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
import axios from 'axios';
import cogoToast from 'cogo-toast';

export default function BookTable({ resturantId }) {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const data = {
      restaurant_id: resturantId,
      name: e.target[0].value,
      phone: e.target[1].value,
      count: e.target[2].value,
      notes: e.target[3].value,
      date: e.target[4].value,
      time: e.target[5].value,
    };
    axios
      .post('https://restaurant-dashboard.se01.tech/api/reservation', data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(function (response) {
        if (response.data.status == 'true') {
          cogoToast.success('request submitted');
        } else {
          cogoToast.warn('someting went wrong');
        }
      });
  };

  return (
    <div
      id="book-a-table"
      className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
    >
      <h5 className="mb-4">Book A Table</h5>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                required
                placeholder="Enter Full Name"
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Mobile number</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                required
                placeholder="Enter Mobile number"
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Count</Form.Label>
              <Form.Control
                name="count"
                type="text"
                required
                placeholder="Number of guests"
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Note</Form.Label>
              <Form.Control
                name="note"
                type="text"
                required
                placeholder="Enter Date And Time"
              />
            </Form.Group>
          </Col>
        </Row>
        <br />

        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                name="date"
                type="date"
                required
                placeholder="Enter Mobile number"
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control
                name="time"
                type="time"
                required
                placeholder="Enter Date And Time"
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Form.Group className="text-right">
          <Button variant="primary" type="submit">
            {' '}
            Submit{' '}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
