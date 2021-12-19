import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import {
  Row,
  Col,
  Container,
  Tab,
  Nav,
  Image,
  Breadcrumb,
} from 'react-bootstrap';
import ItemsCarousel from '../../../common/ItemsCarousel';

import { useTranslation } from 'react-i18next';
import ProductBox from '../../../common/ProductBox';

import BookTable from './bookTable';
import Rates from './Rates';
import About from './about';
import Categories from './categories';
import SubCategory from './subcategories';
import Meal from './meals';

const Details = (props) => {
  const [component, setComponent] = useState('cat');

  const [address, setAddress] = useState('');

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);

  const [meals, setMeals] = useState([]);
  const [rate, setRate] = useState(0);
  const [rates, setRates] = useState([]);

  const [type, setType] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '' });

  const [id, setId] = useState(-1);
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  const { t } = useTranslation();

  useEffect(() => {
    let id = new URLSearchParams(props.location.search).get('id');

    setId(id);
  }, []);

  useEffect(() => {
    getData();
    getComments();
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyBKHwO4kHCnokqGtz8gsFRqUFOYC0cKOnA`
      )
      .then((result) => {
        defaultProps.center = {
          lat: location.lat,
          lng: location.lng,
        };
        setAddress(result.data.results[0].formatted_address);
      });
  }, [location]);

  const getData = () => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/restaurants/${id}`, {
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
          setCategories([...response.data.data.categories]);
          setName(response.data.data.name);
          setPhone(response.data.data.phone);
          setDescription(response.data.data.description);
          setImage(response.data.data.image);
          setRate(response.data.data.rates);
          setType(response.data.data.category);

          setLocation({
            lat: response.data.data.lat,
            lng: response.data.data.lng,
          });
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      })
      .catch(() => {
        console.log('');
      });
  };

  const getSubCategory = (localId) => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/categories/${localId}`, {
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
          setSubCategories(response.data.data.items);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const getMeals = (localId) => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/products/${localId}`, {
        headers: {
          'Content-Language':
            localStorage.getItem('lang') &&
            localStorage.getItem('lang') &&
            localStorage.getItem('lang').search('ar') >= 0
              ? 'ar'
              : 'en',
        },
      })
      .then((response) => {
        if (response.data.status == 'true') {
          setMeals(response.data.data.items);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const getComments = () => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/comments/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((result) => {
        setRates([...result.data.data].reverse());
      });
  };

  return (
    <>
      <section className="restaurant-detailed-banner">
        <div className="text-center">
          <Image fluid className="cover" src="/img/mall-dedicated-banner.png" />
        </div>
        <div className="restaurant-detailed-header">
          <Container>
            <Row className="d-flex align-items-end">
              <Col md={8}>
                <div className="restaurant-detailed-header-left">
                  <Image
                    fluid
                    className="mr-3 float-left"
                    alt="osahan"
                    src={image}
                  />
                  <h2 className="text-white">{name}</h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <Tab.Container defaultActiveKey="first">
        <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
          <Container>
            <Row>
              <Col md={12}>
                <Nav id="pills-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Order Online</Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="third">Restaurant Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Book A Table</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fifth">Ratings & Reviews</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
          <Container>
            <Row>
              <Col md={12}>
                <div className="offer-dedicated-body-left">
                  <Tab.Content className="h-100" style={{ minHeight: '50vh' }}>
                    <Tab.Pane eventKey="first">
                      <section className="section pt-1 pb-5 products-listing">
                        <Container>
                          <Row>
                            {component == 'cat' ? (
                              <Categories
                                categories={categories}
                                getSubCategory={getSubCategory}
                                setComponent={setComponent}
                              />
                            ) : component == 'sub' ? (
                              <SubCategory
                                categories={subcategories}
                                getMeals={getMeals}
                                setComponent={setComponent}
                              />
                            ) : (
                              <Meal meals={meals} setComponent={setComponent} />
                            )}
                          </Row>
                        </Container>
                      </section>{' '}
                    </Tab.Pane>

                    <Tab.Pane eventKey="third">
                      <About
                        address={address}
                        description={description}
                        phone={phone}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      {localStorage.getItem('token') ? (
                        <BookTable resturantId={id} />
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <h3>Log in first</h3>
                        </div>
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
                      <Rates
                        resturantId={id}
                        rates={rates}
                        getComments={getComments}
                        rate={rate}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Tab.Container>
    </>
  );
};

export default Details;
