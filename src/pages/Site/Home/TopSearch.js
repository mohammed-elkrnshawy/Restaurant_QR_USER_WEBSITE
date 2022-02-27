import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, Image } from 'react-bootstrap';
import Select2 from 'react-select2-wrapper';
import Icofont from 'react-icofont';
import OwlCarousel from 'react-owl-carousel3';
import ProductBox from './ProductBox';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import CategoriesCarousel from '../../../common/CategoriesCarousel';

const TopSearch = () => {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // setId(-1);
    getCategories();
    getCities();
  }, []);
  const getCategories = () => {
    axios
      .get('https://restaurant-dashboard.se01.tech/api/restaurantCategories', {
        headers: {
          'Content-Language':
            localStorage.getItem('lang') &&
            localStorage.getItem('lang').search('ar') >= 0
              ? 'ar'
              : 'en',
        },
      })
      .then((response) => {
        if (response.data.status == 'true') {
          let cats = [];
          response.data.data.forEach((c) =>
            cats.push({ id: c.id, text: c.name })
          );
          setCategories(cats);
          console.log(response.data.data);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const getCities = () => {
    axios
      .get('https://restaurant-dashboard.se01.tech/api/cities', {
        headers: {
          'Content-Language':
            localStorage.getItem('lang') &&
            localStorage.getItem('lang').search('ar') >= 0
              ? 'ar'
              : 'en',
        },
      })
      .then((response) => {
        if (response.data.status == 'true') {
          let cits = [];
          response.data.data.items.forEach((c) =>
            cits.push({ id: c.id, text: c.name, image: c.image })
          );
          setCities(cits);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };
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
                  Lists of top restaurants, cafes, pubs, and bars in Melbourne,
                  based on trends
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
                          data={[...categories]}
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
                          data={[...cities]}
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
              <CategoriesCarousel categories={categories} />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

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
