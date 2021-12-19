import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import FontAwesome from '../../common/FontAwesome';
import axios from 'axios';
import cogoToast from 'cogo-toast';
const Login = ({}) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target[0].value || !e.target[1].value) {
      cogoToast.warn('Please Fill All Info');
    } else {
      let values = {
        phone: e.target[0].value,
        password: e.target[1].value,
        token: '33',
        device: 'android',
      };

      axios
        .post(
          'https://restaurant-dashboard.se01.tech/api/auth/login',
          values,
          {}
        )
        .then(function (response) {
          if (response.data.status == 'true') {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('name', response.data.data.name);
            localStorage.setItem('email', response.data.data.email);
            localStorage.setItem('phone', response.data.data.phone);
            history.push('/home');
          } else {
            cogoToast.warn('Phone Or Password Is Wrong');
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
                  <h3 className="login-heading mb-4">Welcome back!</h3>
                  <Form onSubmit={handleSubmit}>
                    <div className="form-label-group">
                      <Form.Control
                        type="text"
                        id="inputEmail"
                        placeholder="Email address"
                      />
                      <Form.Label htmlFor="inputEmail">Mobile</Form.Label>
                    </div>
                    <div className="form-label-group">
                      <Form.Control
                        type="password"
                        id="inputPassword"
                        placeholder="Password"
                      />
                      <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    </div>
                    <Form.Check
                      className="mb-3"
                      custom
                      type="checkbox"
                      id="custom-checkbox"
                      label="Remember password"
                    />
                    <Button
                      className="btn btn-lg btn-block btn-login text-white text-uppercase font-weight-bold mb-2"
                      type="submit"
                    >
                      Sign in
                    </Button>
                    <div className="text-center pt-3">
                      Don’t have an account?{' '}
                      <a className="font-weight-bold" href="/signup">
                        Sign Up
                      </a>
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

export default Login;
