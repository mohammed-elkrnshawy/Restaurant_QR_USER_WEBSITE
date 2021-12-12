import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Layout, Menu, Breadcrumb } from 'antd';

import { Rate, Card, Avatar, Carousel, Row, Col, Radio, Divider } from 'antd';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';
import './style.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const { Meta } = Card;
const contentStyle = {
  fontSize: 30,
  height: 700,
  textAlign: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#eee',
};
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
  const [isLoading, setLoading] = useState(true);

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
          let re = response.data.data.items;
          re.length = 5;

          setResturant([...re]);
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
        <h2>Our Resturants</h2>
        <div
          className="homeContainer2"
          style={{
            padding: 0,
            justifyContent: 'space-between',
          }}
        >
          {Resturant.map((i) => (
            <Card
              style={{
                width: 150,
                margin: 23,
                padding: 0,
                borderRight: 0,
                borderLeft: 0,

                cursor: 'pointer',
              }}
              onClick={() => {
                // setId(i.id);
                history.push(`home/resturant-details/?id=${i.id}`);
              }}
              cover={
                <img
                  alt="example"
                  src={i.image}
                  style={{ width: '100%', height: '128px', objectFit: 'fill' }}
                />
              }
            >
              <Meta
                style={{ padding: 0, margin: 0 }}
                title={i.name}
                description={
                  <>
                    <h6>{i.category || ' _'}</h6>
                    <Rate defaultValue={1} disabled count={1} />
                    <span className="ant-rate-text">{Math.floor(i.rates)}</span>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      </>
    );
  };

  const loading = () => {
    return (
      <div
        className="homeContainer2"
        style={{
          padding: 0,
        }}
      >
        <Card
          style={{
            width: 150,
            margin: 46,
            padding: 0,
            borderRight: 0,
            borderLeft: 0,

            cursor: 'pointer',
          }}
          loading
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
          />
        </Card>
        <Card style={{ width: 190, margin: 26, border: 0 }} loading>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
          />
        </Card>
        <Card style={{ width: 190, margin: 26, border: 0 }} loading>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
          />
        </Card>
        <Card style={{ width: 190, margin: 26, border: 0 }} loading>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
          />
        </Card>
      </div>
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

  const renderFilters = (cit, cat) => {
    return (
      <>
        <Row justify="center" align="top" style={{ marginBottom: 40 }}>
          <Col span={21}>
            <Carousel autoplay>
              <div>
                <div
                  className="heading-custom"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("/assets/table.webp")`,
                    borderRadius: 10,
                  }}
                >
                  <div style={{ ...contentStyle }}>
                    <div>
                      <h1 style={{ color: '#eee', zIndex: 9 }}>
                        +10000 restaurants Order and your food delivered to
                        doorstep...
                      </h1>
                    </div>
                    <div class="StyledComponents__StyledActionsContainer-ljJkyW gRWwNx">
                      <div class="StyledSection-bqFfPK eZvzZK">
                        <button
                          class="StyledButton-gXzblK gPMteB"
                          type="button"
                          onClick={() => {
                            history.push('/home');
                          }}
                        >
                          <p
                            class="Text-bUpXnE jKIPBb"
                            font-size="12"
                            style={{ margin: 0, fontSize: '18px' }}
                          >
                            Browse Stores List
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel>
          </Col>
        </Row>
        <Row justify="center" style={{ marginBottom: 40 }}>
          <Col span={10} style={{ marginInline: 40 }}>
            <div class="StyledComponents__LeftSection-dWcQaw fteYf">
              <div class="StyledComponents__LeftDetailsWrapper-kwZCxs eBCsCP">
                <img
                  class="StyledComponents__SectionImg-eotTqD bTYrvs"
                  src="/assets/mac.png"
                  alt="quick-market"
                  height="51px"
                />
                <div class="StyledComponents__SectionWrapper-eQTNpq hsFify">
                  <div class="StyledBox-bStriS gwTjDl" width="100%">
                    <div class="Header-bKPLEa gKRaHC" font-size="32px">
                      Quick Market
                    </div>
                    <p class="DetailsText-bKqcus jlkHWS">
                      We serve you with the freshest groceries, and +2000
                      products of what your house needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={10} style={{ marginInline: 40 }}>
            <div class="StyledComponents__LeftSection-dWcQaw fteYf">
              <div class="StyledComponents__LeftDetailsWrapper-kwZCxs eBCsCP2">
                <img
                  class="StyledComponents__SectionImg-eotTqD bTYrvs"
                  src="/assets/mac.png"
                  alt="quick-market"
                  height="51px"
                />
                <div class="StyledComponents__SectionWrapper-eQTNpq hsFify">
                  <div class="StyledBox-bStriS gwTjDl" width="100%">
                    <div class="Header-bKPLEa gKRaHC" font-size="32px">
                      Quick Market
                    </div>
                    <p class="DetailsText-bKqcus jlkHWS">
                      Our Personal Shopper is here to cater your needs and bring
                      you anything from anywhere!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row justify="center" style={{ marginBottom: 40 }}>
          <Col span={18} style={{ marginInline: 10 }}>
            {content()}
          </Col>
        </Row>
        <Row justify="center" style={{ marginBottom: 40 }}>
          <Col span={8} style={{ marginInline: 40 }}>
            <div class="StyledComponents__LeftSection-dWcQaw fteYf">
              <div class="StyledComponents__LeftDetailsWrapper-kwZCxs eBCsCP">
                <img
                  class="StyledComponents__SectionImg-eotTqD bTYrvs"
                  src="/assets/mac.png"
                  alt="quick-market"
                  height="51px"
                />
                <div class="StyledComponents__SectionWrapper-eQTNpq hsFify">
                  <div class="StyledBox-bStriS gwTjDl" width="100%">
                    <div class="Header-bKPLEa gKRaHC" font-size="32px">
                      Quick Market
                    </div>
                    <p class="DetailsText-bKqcus jlkHWS">
                      We serve you with the freshest groceries, and +2000
                      products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12} style={{ marginInline: 40 }}>
            <div class="StyledComponents__LeftSection-dWcQaw fteYf">
              <div class="StyledComponents__LeftDetailsWrapper-kwZCxs eBCsCP2">
                <img
                  class="StyledComponents__SectionImg-eotTqD bTYrvs"
                  src="/assets/mac.png"
                  alt="quick-market"
                  height="51px"
                />
                <div class="StyledComponents__SectionWrapper-eQTNpq hsFify">
                  <div class="StyledBox-bStriS gwTjDl" width="100%">
                    <div class="Header-bKPLEa gKRaHC" font-size="32px">
                      Quick Market
                    </div>
                    <p class="DetailsText-bKqcus jlkHWS">
                      Our Personal Shopper is here to cater your needs and bring
                      you anything Our Personal Shopper is here to cater your
                      needs and bring you anything
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  };
  return renderFilters(cities, categories);
};

export default Index;
