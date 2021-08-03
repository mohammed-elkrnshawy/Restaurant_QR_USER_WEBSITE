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

    if (localStorage.getItem('token') < 9) {
      return cogoToast.info(t('Login first'));
    }

    let values = {
      restaurant_id: id,
      comment: comment,
      rate: stars,
    };

    console.log(values);

    // cogoToast.loading('loading');
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
        <div
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden',
            height: '80vh',
            width: '100%',
          }}
        >
          <div
            className="reqformContent"
            style={{ overflowY: 'scroll', width: 'inherit' }}
          >
            <h2>{t('Comments & Rates')}</h2>
            <form
              onSubmit={handleSubmit}
              style={{
                justifyContent: 'inherit',
                width: '100%',
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
                  justifyContent: 'inherit',
                  width: '100%',
                }}
                className="note"
              />

              <input
                className="joinwaitingbtn "
                style={{
                  width: '100%',
                  margin: 0,
                  maxWidth: 400,

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
                  width: '100%',
                  marginTop: 16,
                  marginInlineEnd: 32,
                  display: 'inline-block',
                }}
                title={rate.user}
                extra={<Rate disabled value={rate.rate} />}
                loading={loading}
              >
                <Meta
                  description={
                    <p
                      style={{
                        paddingTop: 0,
                        paddingRight: 26,
                        paddingLeft: 26,
                      }}
                    >
                      {rate.comment}
                    </p>
                  }
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
