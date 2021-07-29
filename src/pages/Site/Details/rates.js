import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Item from './item';
import { Rate } from 'antd';
import { useTranslation } from 'react-i18next';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
const { Meta } = Card;

export default function Rates({ id, overallRate, changeComponent }) {
  const [rates, setRates] = useState([]);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/comments/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((result) => {
        setLoading(false);
        setRates([...result.data.data]);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let values = {
      restaurant_id: id,
      comment: comment,
      rate: stars,
    };

    console.log(values);

    axios
      .post('https://restaurant-dashboard.se01.tech/api/add_comment', values, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(function (response) {
        if (response.data.status == 'true') {
          setIsOpen(false);
          getComments();
          cogoToast.success('request submitted');
        } else {
          cogoToast.warn('someting went wrong');
        }
      });
  };

  return (
    <div
      className="categories"
      style={{
        height: '100vh',
      }}
    >
      <div className="ratesCountaner">
        <div style={{ overflowY: 'scroll', height: '80vh', width: '75vw' }}>
          <div
            className="reqformContent"
            style={{ overflowY: 'scroll', width: '75vw' }}
          >
            <h2>{t('Comments & Rates')}</h2>
            <form
              onSubmit={handleSubmit}
              style={{
                justifyContent: 'inherit',
              }}
            >
              <h4
                style={{
                  width: '95%',
                }}
              >
                {t('Please fill in the information to complete the rate')}
                <br /> <Rate onChange={(e) => setStars(e)} />
              </h4>
              <input
                type="text"
                name="comment"
                placeholder={t('Comment')}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                }}
                className="note"
              />

              <input
                className="joinwaitingbtn "
                style={{
                  width: 300,
                  margin: 0,
                  marginTop: 20,
                }}
                value={t('Submit Comment')}
                type="submit"
              />
            </form>
          </div>
          {loading ? (
            <>
              {' '}
              <Card
                style={{ width: 400, margin: 16, display: 'inline-block' }}
                loading={true}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                />
              </Card>
              <Card
                style={{ width: 400, margin: 16, display: 'inline-block' }}
                loading={true}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                />
              </Card>
              <Card
                style={{ width: 400, margin: 16, display: 'inline-block' }}
                loading={true}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                />
              </Card>
              <Card
                style={{ width: 400, margin: 16, display: 'inline-block' }}
                loading={true}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                />
              </Card>
            </>
          ) : rates.length > 0 ? (
            rates.map((rate) => (
              <Card
                style={{
                  width: 400,
                  margin: 16,
                  display: 'inline-block',
                }}
                title={rate.user}
                extra={<Rate disabled value={rate.rate} />}
                loading={loading}
              >
                <Meta
                  description={<p style={{ padding: 16 }}>{rate.comment}</p>}
                />
              </Card>
            ))
          ) : (
            'no rates for this resturant'
          )}
        </div>
      </div>
    </div>
  );
}
