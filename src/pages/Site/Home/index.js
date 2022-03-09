import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  Dropdown,
  Accordion,
  Button,
  Form,
  Spinner,
} from 'react-bootstrap';
import Icofont from 'react-icofont';
import PageTitle from '../../../common/PageTitle';
import OwlCarousel from 'react-owl-carousel3';
import TopSearch from './TopSearch';
import ProductBox from './ProductBox';
import CardItem from '../../../common/CardItem';
import SectionHeading from '../../../common/SectionHeading';
import FontAwesome from '../../../common/FontAwesome';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';

const Index = ({ changeComponent, setId, id }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  const [city, setCity] = useState('');
  const [rate, setRate] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const [Resturant, setResturant] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // setId(-1);
    getData();
    getCategories();
    getCities();
  }, []);

  useEffect(() => {
    console.log(city, rate, category);

    // if (e.target.value[0] == 's') {
    //   setCategory(e.target.value.slice(1));
    // } else if (e.target.value[0] == 'c') {
    //   setCategory(e.target.value.slice(1));
    // }

    let query = `https://restaurant-dashboard.se01.tech/api/restaurants?${
      city != '' ? 'city_id=' + city : ''
    }${rate != '' ? '&rate=' + rate : ''}${
      category != '' ? '&main_category=' + category : ''
    }
    ${
      // category != '' && category[0] == 's'
      //   ? '&sub_category=' + category.slice(1)
      ''
    }
    ${search != '' ? '&name=' + search : ''}`;

    setLoading(true);
    axios
      .get(query, {
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
          setResturant([...response.data.data.items]);
          console.log(Resturant);
          setLoading(false);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  }, [city, rate, category, search]);

  useEffect(() => {
    // if (id > 0) changeComponent('details');
  }, [id]);

  useEffect(() => {
    setLoading(true);
    // setId(-1);
    getData();
  }, [localStorage.getItem('lang')]);

  const getData = () => {
    setLoading(true);
    axios
      .get('https://restaurant-dashboard.se01.tech/api/restaurants', {
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
          setResturant([...response.data.data.items]);
          console.log(Resturant);
          setLoading(false);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

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
          setCategories([...response.data.data]);
          console.log(response.data.data);
          setLoading(false);
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
          setCities([...response.data.data.items]);
          console.log(Resturant);
          setLoading(false);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  function onCatChange(e) {
    // if (e.target.value[0] == 's') {
    //   setCategory(e.target.value.slice(1));
    // } else if (e.target.value[0] == 'c') {
    //   setCategory(e.target.value.slice(1));
    // }

    setCategory(e.target.value);
  }
  function onCityChange(e) {
    setCity(e.target.value);
  }
  function onRateChange(e) {
    setRate(e.target.value);
  }

  return (
    <>
      <TopSearch />
      {/* <section className="section pt-5 pb-5 bg-white homepage-add-section">
        <Container>
          <Row>
            <Col md={3} xs={6}>
              <ProductBox
                image="/img/pro1.jpg"
                imageClass="img-fluid rounded"
                imageAlt="product"
                linkUrl="#"
              />
            </Col>
            <Col md={3} xs={6}>
              <ProductBox
                image="/img/2.jpg"
                imageClass="img-fluid rounded"
                imageAlt="product"
                linkUrl="#"
              />
            </Col>
            <Col md={3} xs={6}>
              <ProductBox
                image="/img/pro3.jpg"
                imageClass="img-fluid rounded"
                imageAlt="product"
                linkUrl="#"
              />
            </Col>
            <Col md={3} xs={6}>
              <ProductBox
                image="/img/pro4.jpg"
                imageClass="img-fluid rounded"
                imageAlt="product"
                linkUrl="#"
              />
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* <section className="section pt-5 pb-5 products-section">
        <Container>
          <SectionHeading
            heading="Popular Brands"
            subHeading="Top restaurants, cafes, pubs, and bars in Ludhiana, based on trends"
          />
          <Row>
            <Col md={12}>
              <OwlCarousel
                nav
                loop
                {...options}
                className="owl-carousel-four owl-theme"
              >
                <div className="item">
                  <CardItem
                    title="World Famous"
                    subTitle="North Indian • American • Pure veg"
                    imageAlt="Product"
                    image="/img/list/1.png"
                    imageClass="img-fluid item-img"
                    linkUrl="detail"
                    offerText="65% off | Use Coupon OSAHAN50"
                    time="20–25 min"
                    price="$250 FOR TWO"
                    showPromoted={true}
                    promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="3.1 (300+)"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="Bite Me Sandwiches"
                    subTitle="North Indian • American • Pure veg"
                    imageAlt="Product"
                    image="/img/list/3.png"
                    imageClass="img-fluid item-img"
                    linkUrl="detail"
                    offerText="65% off | Use Coupon OSAHAN50"
                    time="15–25 min"
                    price="$100 FOR TWO"
                    showPromoted={true}
                    promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="3.1 (300+)"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="The osahan Restaurant"
                    subTitle="North Indian • American • Pure veg"
                    imageAlt="Product"
                    image="/img/list/6.png"
                    imageClass="img-fluid item-img"
                    linkUrl="detail"
                    offerText="65% off | Use Coupon OSAHAN50"
                    time="20–25 min"
                    price="$500 FOR TWO"
                    showPromoted={true}
                    promotedVariant="danger"
                    favIcoIconColor="text-dark"
                    rating="3.1 (300+)"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="Polo Lounge"
                    subTitle="North Indian • American • Pure veg"
                    imageAlt="Product"
                    image="/img/list/9.png"
                    imageClass="img-fluid item-img"
                    linkUrl="detail"
                    offerText="65% off | Use Coupon OSAHAN50"
                    time="20–25 min"
                    price="$250 FOR TWO"
                    showPromoted={true}
                    promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="3.1 (300+)"
                  />
                </div>
              </OwlCarousel>
            </Col>
          </Row>
        </Container>
      </section> */}
      {/* <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom">
        <Container>
          <SectionHeading
            heading="Become a Member"
            subHeading="Lorem Ipsum is simply dummy text of"
          />
          <Row>
            <Col sm={12} className="text-center">
              <Link to="register" className="btn btn-success btn-lg">
                Create an Account <FontAwesome icon="chevron-circle-right" />
              </Link>
            </Col>
          </Row>
        </Container>
      </section> */}
    </>
  );
};
const options = {
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
    1200: {
      items: 4,
    },
  },

  lazyLoad: true,
  pagination: false.toString(),
  loop: true,
  dots: false,
  autoPlay: 2000,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
};

export default Index;
