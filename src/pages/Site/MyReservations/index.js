import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Item from './item';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { Card, Avatar, Rate } from 'antd';
import OrderCard from '../../../common/OrderCard';
import {} from 'react-bootstrap';

import './style.css';
import { Col, Row, Container } from 'react-bootstrap';
const { Meta } = Card;

const Index = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/myReservations`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (response.data.status == 'true') {
          setLoading(false);
          return response.data.data;
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      })
      .then((res) => {
        setData(res);
      });
  };

  const content = () => {
    return (
      <div className="p-4 bg-white shadow-sm ">
        <Container>
          <h4 className="font-weight-bold mt-0 mb-4">Past Orders</h4>
          <Row>
            {data.length > 0
              ? data.map((i) => (
                  <Col md={3}>
                    <OrderCard
                      image={i.restaurant_image}
                      imageAlt=""
                      orderNumber={i.id}
                      orderDate={new Date(i.date).toDateString() + ' ' + i.time}
                      orderTitle={i.name.substring(0, 10)}
                      orderProducts={'status: ' + i.status}
                      helpLink="#"
                    />
                  </Col>
                ))
              : 'No reservations'}
          </Row>
        </Container>
      </div>
    );
  };

  const loading = () => {
    return (
      <div className="homeContainer">
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

  return isLoading ? loading() : content();
};

export default Index;
