import React from 'react';

import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
export const SignUp = ({ changeMainComponent }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[3].value != e.target[4].value) {
      cogoToast.warn('Password dose not match');
    } else if (
      !e.target[0].value ||
      !e.target[1].value ||
      !e.target[2].value ||
      !e.target[3].value
    ) {
      cogoToast.warn('Please Fill All Info');
    } else {
      let values = {
        name: e.target[0].value,
        email: e.target[1].value,
        phone: e.target[2].value,
        password: e.target[3].value,
        device: 'web',
      };

      axios
        .post(
          'https://restaurant-dashboard.se01.tech/api/auth/register',
          values
        )
        .then(function (response) {
          if (response.data.status == 'true') {
            cogoToast.success('regestered successfuly');

            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('name', response.data.data.name);

            history.push('/home');
          } else {
            cogoToast.warn(response.data.message);
          }
        });
    }
  };

  return (
    <Container fluid className="bg-white">
      <Row>
        <Col
          md={4}
          lg={6}
          className="d-none d-md-flex bg-image"
          style={{
            backgroundImage: `url("/assets/bg.png")`,
          }}
        ></Col>
        <Col md={8} lg={6}>
          <div className="login d-flex align-items-center py-5">
            <Container>
              <Row>
                <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                  <h3 className="login-heading mb-4">New Buddy!</h3>
                  <Form onSubmit={handleSubmit}>
                    <div className="form-label-group">
                      <Form.Control
                        type="text"
                        id="name"
                        placeholder="Name"
                        name="name"
                      />
                      <Form.Label htmlFor="name">Name</Form.Label>
                    </div>
                    <div className="form-label-group">
                      <Form.Control
                        type="email"
                        id="inputEmail"
                        name="email"
                        placeholder="Email address"
                      />
                      <Form.Label htmlFor="inputEmail">Email</Form.Label>
                    </div>
                    <div className="form-label-group">
                      <Form.Control
                        type="text"
                        id="phone"
                        name="mobileNum"
                        placeholder="Phone"
                      />
                      <Form.Label htmlFor="phone">Phone</Form.Label>
                    </div>
                    <div className="form-label-group">
                      <Form.Control
                        type="password"
                        id="inputPassword"
                        name="password"
                        placeholder="Password"
                      />
                      <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    </div>
                    <div className="form-label-group">
                      <Form.Control
                        type="password"
                        id="inputPassword2"
                        name="rpassword"
                        placeholder="Confirm Password"
                      />
                      <Form.Label htmlFor="inputPassword2">
                        Confirm Password
                      </Form.Label>
                    </div>

                    <Button
                      to="/login"
                      type="submit"
                      className="btn btn-lg  btn-block btn-login text-uppercase font-weight-bold mb-2"
                    >
                      Sign Up
                    </Button>
                    <div className="text-center pt-3">
                      Already have an account?{' '}
                      <Link className="font-weight-bold" to="/login">
                        Sign In
                      </Link>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
