import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, Image } from 'react-bootstrap';
import Select2 from 'react-select2-wrapper';
import Icofont from 'react-icofont';
import OwlCarousel from 'react-owl-carousel3';
import ProductBox from './ProductBox';

import CategoriesCarousel from '../../../common/CategoriesCarousel';

class TopSearch extends React.Component {
  render() {
    return (
      <section
        className=" homepage-search-block position-relative"
        style={{ height: '100vh' }}
      >
        <div className="text-center" style={{ height: '100vh' }}>
          <Image
            fluid
            className="cover"
            src="/assets/table.webp"
            style={{ height: '100vh' }}
          />
        </div>
        <div className="restaurant-detailed-header">
          <Container style={{ bottom: '200px' }}>
            <Row
              className="d-flex align-items-center text-white"
              style={{ bottom: '200px' }}
            >
              <Col md={12} style={{ bottom: '30vh' }}>
                <div className="homepage-search-title">
                  <h1 className="mb-2 font-weight-normal text-white">
                    <span className="font-weight-bold text-white">
                      Find Awesome Deals
                    </span>{' '}
                    in KSA
                  </h1>
                  <h5 className="mb-5  font-weight-normal text-white">
                    Lists of top restaurants, cafes, pubs, and bars in
                    Melbourne, based on trends
                  </h5>
                </div>
                <div className="homepage-search-form">
                  <Form className="form-noborder">
                    <div className="form-row">
                      <Form.Group className="col-lg-3 col-md-3 col-sm-12">
                        <div className="location-dropdown">
                          <Icofont icon="location-arrow" />
                          <Select2
                            className="custom-select"
                            data={[
                              { text: 'Breakfast', id: 1 },
                              { text: 'Lunch', id: 2 },
                              { text: 'Dinner', id: 3 },
                              { text: 'Cafés', id: 4 },
                              { text: 'Delivery', id: 5 },
                            ]}
                            options={{
                              placeholder: 'Category Search',
                            }}
                          />
                        </div>
                      </Form.Group>
                      <Form.Group className="col-lg-3 col-md-3 col-sm-12">
                        <div className="location-dropdown">
                          <Icofont icon="location-arrow" />
                          <Select2
                            className="custom-select"
                            data={[
                              { text: 'Breakfast', id: 1 },
                              { text: 'Lunch', id: 2 },
                              { text: 'Dinner', id: 3 },
                              { text: 'Cafés', id: 4 },
                              { text: 'Delivery', id: 5 },
                            ]}
                            options={{
                              placeholder: 'City',
                            }}
                          />
                        </div>
                      </Form.Group>
                      <Form.Group className="col-lg-4 col-md-4 col-sm-11">
                        <Form.Control
                          type="text"
                          placeholder="Search"
                          size="lg"
                        />
                      </Form.Group>
                      <Form.Group className="col-lg-2 col-md-2 col-sm-12">
                        <Link
                          to="listing"
                          className="btn btn-primary btn-block btn-lg btn-gradient"
                        >
                          Search
                        </Link>
                      </Form.Group>
                    </div>
                  </Form>
                </div>
                <h6 className="mt-4 text-white font-weight-normal">
                  E.g. Beverages, Pizzas, Chinese, Bakery, Indian...
                </h6>
                <CategoriesCarousel />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

const options2 = {
  responsive: {
    0: {
      items: 2,
    },
    764: {
      items: 2,
    },
    765: {
      items: 1,
    },
    1200: {
      items: 1,
    },
  },
  lazyLoad: true,
  loop: true,
  autoplay: true,
  autoplaySpeed: 1000,
  dots: false,
  autoplayTimeout: 2000,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
  autoplayHoverPause: true,
};

export default TopSearch;
