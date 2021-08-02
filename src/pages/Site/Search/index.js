import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Rate, Card, Avatar, Input, Row, Col, Radio } from 'antd';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';
import './style.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const { Meta } = Card;

const Index = ({ changeComponent, setId, id }) => {
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
    setId(-1);
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
    if (id > 0) changeComponent('details');
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setId(-1);
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
      <div
        className="homeContainer"
        style={{
          padding: 0,
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
              setId(i.id);
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
    );
  };

  const loading = () => {
    return (
      <div
        className="homeContainer"
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
        </Card>{' '}
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
        </Card>{' '}
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
      <Layout>
        <Layout
          style={{
            backgroundColor: 'white',
            height: '90vh',
          }}
        >
          <Sider
            width={350}
            style={{
              backgroundColor: 'white',
              textAlign: 'center',
              marginTop: 100,
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            <Input
              placeholder="Search"
              style={{ width: '95%' }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: 'fit-content',
                borderRight: 0,
                marginTop: 50,
                marginBottom: 5,
              }}
            >
              {' '}
              <SubMenu
                key="sub1"
                title={
                  <h4 style={{ width: 'fit-content' }}>{t('Categories')}</h4>
                }
              >
                <Radio.Group style={{ width: '100%' }} onChange={onCatChange}>
                  {cat.map((i) => (
                    <Row
                      style={{
                        alignItems: 'start',
                        justifyContent: 'start',
                        paddingInline: 24,
                      }}
                      key={`${i.id}`}
                      id={`${i.id}`}
                    >
                      <Radio
                        value={`${i.id}`}
                        key={`${i.id}`}
                        id={`${i.id}`}
                        name={i.name}
                        style={{ marginTop: 9, marginBottom: 9 }}
                      >
                        {i.name}
                      </Radio>
                    </Row>
                  ))}
                </Radio.Group>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<h4 style={{ width: 'fit-content' }}>{t('Cities')}</h4>}
                style={{
                  alignContent: 'center',
                }}
              >
                <Radio.Group style={{ width: '100%' }} onChange={onCityChange}>
                  {cit.map((city) => (
                    <Row
                      style={{
                        alignItems: 'start',
                        justifyContent: 'start',
                        paddingInline: 24,
                      }}
                    >
                      <Radio
                        value={city.id}
                        style={{ marginTop: 9, marginBottom: 9 }}
                      >
                        {city.name}
                      </Radio>
                    </Row>
                  ))}
                </Radio.Group>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={<h4 style={{ width: 'fit-content' }}>{t('Rates')}</h4>}
                style={{ backgroundColor: 'white' }}
              >
                <Radio.Group style={{ width: '100%' }} onChange={onRateChange}>
                  <Row
                    style={{
                      alignItems: 'start',
                      justifyContent: 'start',
                      paddingInline: 24,
                    }}
                  >
                    <Radio value="0">
                      <Rate disabled value={0} />
                    </Radio>
                  </Row>

                  <Row
                    style={{
                      alignItems: 'start',
                      justifyContent: 'start',
                      paddingInline: 24,
                    }}
                  >
                    <Radio value="1">
                      <Rate disabled value={1} />
                    </Radio>
                  </Row>

                  <Row
                    style={{
                      alignItems: 'start',
                      justifyContent: 'start',
                      paddingInline: 24,
                    }}
                  >
                    <Radio value="2">
                      <Rate disabled value={2} />
                    </Radio>
                  </Row>

                  <Row
                    style={{
                      alignItems: 'start',
                      justifyContent: 'start',
                      width: '100%',
                      paddingInline: 24,
                    }}
                  >
                    <Radio
                      value="3"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Rate
                        style={{
                          width: '100%',
                        }}
                        disabled
                        value={3}
                      />
                    </Radio>
                  </Row>

                  <Row
                    style={{
                      alignItems: 'start',
                      justifyContent: 'start',
                      paddingInline: 24,
                    }}
                  >
                    <Radio value="4">
                      <Rate disabled value={4} />
                    </Radio>
                  </Row>

                  <Row
                    style={{
                      alignItems: 'start',
                      justifyContent: 'start',
                      paddingInline: 24,
                    }}
                  >
                    <Radio value="5">
                      <Rate disabled value={5} />
                    </Radio>
                  </Row>
                </Radio.Group>
              </SubMenu>
            </Menu>
            {/* <input
              className="newResButton"
              style={{
                padding: 0,

                display: 'inline',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                height: '4vh',
                width: '90%',
                marginBlockStart: 30,
                fontSize: '90%',
              }}
              value={t('Reset ')}
              onClick={(e) => {
                setCategory('');
                setCity('');
                setRate('');
                setSearch('');
              }}
              type="button"
            /> */}
          </Sider>
          <Layout style={{ padding: '0 24px 24px', backgroundColor: 'white' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                height: 'inhert',
                backgroundColor: 'white',
              }}
            >
              {isLoading ? loading() : content()}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  };
  return renderFilters(cities, categories);
};

export default Index;
