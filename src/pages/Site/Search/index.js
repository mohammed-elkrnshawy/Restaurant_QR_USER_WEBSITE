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
import TopSearch from '../Home/TopSearch';
import ProductBox from '../Home/ProductBox';
import CardItem from '../../../common/CardItem';
import SectionHeading from '../../../common/SectionHeading';
import FontAwesome from '../../../common/FontAwesome';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';
import './style.css';

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

  const content = () => {
    return (
      <>
        <section className="section pt-5 pb-5 products-listing">
          <Container>
            <Row>
              <Col md={12}>
                <Row>
                  {Resturant.map((r) => (
                    <Col md={2} sm={6} className="mb-4 pb-2">
                      <CardItem
                        title={r.name}
                        subTitle="North Indian • American • Pure veg"
                        imageAlt="Product"
                        image={r.image}
                        imageClass="img-fluid item-img col-12 "
                        linkUrl={`/home/resturant/?id=${r.id}`}
                        offerText="65% off | Use Coupon OSAHAN50"
                        time="15–25 min"
                        price="$100 FOR TWO"
                        showPromoted={true}
                        promotedVariant="dark"
                        favIcoIconColor="text-danger"
                        rating={Math.floor(Number(r.rates))}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
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

  return content();
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
