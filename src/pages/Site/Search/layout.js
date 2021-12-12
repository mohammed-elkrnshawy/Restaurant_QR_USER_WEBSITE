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

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const { Meta } = Card;

const Layout = ({ changeComponent, setId, id }) => {
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
  }, []);

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
      .get('https://restaurant-dashboard.se01.tech/api/categories', {
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
          setCategories([...response.data.data.items]);
          console.log(response.data.data.items);
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

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  const renderFilters = (cit, cat) => {
    return (
      <Layout>
        <Layout>
          <Sider
            width={350}
            style={{
              backgroundColor: 'white',
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0, marginTop: 100 }}
            >
              {' '}
              <SubMenu key="sub1" icon={<UserOutlined />} title="Category">
                <Radio.Group style={{ width: '100%' }} onChange={onChange}>
                  {cat.map((i) => (
                    <Row
                      style={{
                        alignItems: 'start',
                        paddingLeft: 55,
                        justifyContent: 'start',
                      }}
                      key={i.id}
                      id={i.id}
                    >
                      <SubMenu
                        key={`sub${i.id}`}
                        title={i.name}
                        style={{
                          alignContent: 'start',
                        }}
                      >
                        <Radio value={i.id} key={i.id} id={i.id}>
                          {i.subCategories.map((x) => {
                            <Row
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Col span={13}>
                                <Radio value={x.id} id={x.id} key={x.id}>
                                  {x.name}
                                </Radio>
                              </Col>
                            </Row>;
                          })}
                        </Radio>
                      </SubMenu>
                    </Row>
                  ))}
                </Radio.Group>
              </SubMenu>
              <SubMenu
                key="sub2"
                title="City"
                style={{
                  alignContent: 'center',
                }}
              >
                <Radio.Group style={{ width: '100%' }} onChange={onChange}>
                  <Row
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cit.map((city) => (
                      <Col span={13}>
                        <Radio value={city.id}>{city.name}</Radio>
                      </Col>
                    ))}
                  </Row>
                </Radio.Group>
              </SubMenu>
              <SubMenu key="sub3" title="Rate">
                <Radio.Group style={{ width: '100%' }} onChange={onChange}>
                  <Row
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Col span={13}>
                      <Radio value="1">
                        <Rate disabled value={1} count={1} />
                      </Radio>
                    </Col>
                    <Col span={13}>
                      <Radio value="2">
                        <Rate disabled value={2} count={1} />
                      </Radio>
                    </Col>
                    <Col span={13}>
                      <Radio value="3">
                        <Rate disabled value={3} count={1} />
                      </Radio>
                    </Col>
                    <Col span={13}>
                      <Radio value="4">
                        <Rate disabled value={4} count={1} />
                      </Radio>
                    </Col>
                    <Col span={13}>
                      <Radio value="5">
                        <Rate disabled value={5} count={1} />
                      </Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </SubMenu>
            </Menu>
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
  return renderFilters(cit, cat);
};

export default Layout;
