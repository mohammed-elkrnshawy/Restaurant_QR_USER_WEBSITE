import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs } from 'antd';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Category from './category';
import About from './about';

import SubCategory from './subcategory';
import Meals from './meals';

import './style.css';
import Rates from './rates';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;

const Details = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenContactUs, setIsOpenContactUs] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [meals, setMeals] = useState([]);
  const [rate, setRate] = useState(0);

  const [type, setType] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [loading, setLoading] = useState(true);

  const [currentComponent, setCurrentComponent] = useState('category');
  const [selected, setSelected] = useState(1);
  const [id, setId] = useState(-1);
  const { t } = useTranslation();

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const paramId = params.get('id');

    setId(paramId);
    getData(paramId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !e.target[0].value ||
      !e.target[1].value ||
      !e.target[2].value ||
      !e.target[4].value ||
      !e.target[5].value ||
      !e.target[6].value
    ) {
      cogoToast.warn('Please Fill All Info');
    } else {
      let values = {
        restaurant_id: id,
        name: e.target.name.value,
        phone: e.target.phone.value,
        count: e.target.count.value,
        date: e.target.date.value,
        time: e.target.time.value,
        notes: e.target.note.value,
      };

      console.log(values);

      axios
        .post(
          'https://restaurant-dashboard.se01.tech/api/reservation',
          values,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(function (response) {
          if (response.data.status == 'true') {
            setIsOpen(false);
            cogoToast.success('request submitted');
          } else {
            cogoToast.warn('someting went wrong');
          }
        });
    }
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();

    let values = {
      restaurant_id: id,
      name: e.target[0].value,
      phone: e.target[1].value,
      message: e.target[2].value,
    };

    axios
      .post('https://restaurant-dashboard.se01.tech/api/contact', values, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(function (response) {
        if (response.data.status == 'true') {
          cogoToast.success('request submitted');
          setIsOpenContactUs(false);
        } else {
          cogoToast.warn('someting went wrong');
        }
      });
  };

  const getData = (paramId) => {
    setLoading(true);
    axios
      .get(
        `https://restaurant-dashboard.se01.tech/api/restaurants/${paramId}`,
        {
          headers: {
            'Content-Language':
              localStorage.getItem('lang') &&
              localStorage.getItem('lang').search('ar') >= 0
                ? 'ar'
                : 'en',
          },
        }
      )
      .then((response) => {
        if (response.data.status == 'true') {
          setCategories(response.data.data.categories);
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
          setLoading(false);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      })
      .catch(() => {
        console.log('');
      });
  };

  const getSubCategory = (localId) => {
    setLoading(true);

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
          setSubCategory(response.data.data.items);
          setLoading(false);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const getMeals = (localId) => {
    setLoading(true);

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
          setLoading(false);

          setMeals(response.data.data.items);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const tabs = () => {
    return (
      <Tabs
        defaultActiveKey="1"
        onChange={callback}
        active
        tabBarStyle={{
          color: 'GrayText',
        }}
      >
        <TabPane tab={t('menu')} key="1">
          {theComponent()}
        </TabPane>
        <TabPane tab={t('about')} key="2">
          <About
            changeComponent={setCurrentComponent}
            description={description}
            categories={categories}
            location={location}
            getSubCategory={getSubCategory}
          />
        </TabPane>
        <TabPane tab={t('rates')} key="3">
          <Rates
            id={props.id}
            overallRate={rate}
            changeComponent={setCurrentComponent}
          />
        </TabPane>
      </Tabs>
    );
  };

  function callback(key) {
    console.log(key);
  }

  const theComponent = () => {
    switch (currentComponent) {
      case 'category':
        return (
          <Category
            changeComponent={setCurrentComponent}
            categories={categories}
            setId={setId}
            getSubCategory={getSubCategory}
            loading={loading}
          />
        );

      case 'subCategory':
        return (
          <SubCategory
            changeComponent={setCurrentComponent}
            subCategory={subCategory}
            getMeals={getMeals}
            loading={loading}
          />
        );
      case 'meals':
        return <Meals meals={meals} changeComponent={setCurrentComponent} />;

      default:
        return (
          <Category
            changeComponent={setCurrentComponent}
            categories={categories}
            setId={setId}
            getSubCategory={getSubCategory}
          />
        );
    }
  };

  return (
    <div className="details-container">
      <div
        className="details-panar"
        style={{
          backgroundImage: `url("/assets/bg.png")`,
          backgroundSize: 'cover',
        }}
      >
        <div className="homeimageCont">
          <div
            className="homeimg"
            style={{
              backgroundImage: `url("${image}")`,
            }}
          ></div>
          <h3 style={{ color: 'white' }}>{name}</h3>
        </div>
        <p
          className="hometype"
          style={{
            color: 'white',
          }}
        >
          {type}
        </p>
        <p
          className=""
          style={{
            fontSize: 15,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 5,
            margin: 5,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          {' '}
          {phone}
        </p>
        <div className="homestatus"></div>
        {localStorage.getItem('token') ? (
          <div className="dialogCont">
            <input
              className="newResButton "
              style={{
                visibility: 'hidden',
                display: 'inline',
                color: 'white',
                height: '5vh',
                justifyContent: 'center',
                alignItems: 'center',
                width: '12vw',
                border: 0,
                padding: 0,
              }}
              type="button"
            />
            <input
              className="newResButton "
              style={{
                display: 'inline',
                backgroundColor: '#15b2a2',
                color: 'white',
                height: '5vh',
                justifyContent: 'center',
                alignItems: 'center',
                width: '14vw',
                border: 0,
                padding: 0,
              }}
              value={t('Contact Us')}
              onClick={(e) => {
                setIsOpenContactUs(true);
              }}
              type="button"
            />
            <input
              className="newResButton "
              style={{
                padding: 0,

                display: 'inline',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                height: '5vh',
                justifyContent: 'center',
                alignItems: 'center',
                width: '14vw',
                fontSize: '90%',
              }}
              value={t('Make New Reservation')}
              onClick={(e) => {
                openModal();
              }}
              type="button"
            />
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="details-content">{tabs()}</div>

      <Modal
        closable
        title={
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h4 style={{}}>{t('New Reservation')}</h4>
          </div>
        }
        centered
        width="43%"
        visible={modalIsOpen}
        onCancel={() => setIsOpen(false)}
        footer={false}
      >
        <div className="reqformContent">
          <h5 style={{ width: 'fit-content' }}>
            {t('Make A New Reservation')}
          </h5>
          <p style={{ width: 'fit-content' }}>
            {t('Please fill in the information to complete your request')}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={t('Name')}
              style={{ width: '100%' }}
            />

            <input type="text" name="phone" placeholder={t('Mobile Number')} />

            <input type="text" name="count" placeholder={t('People')} />

            <input
              type="date"
              name="date"
              placeholder="Date"
              className="date"
            />
            <input
              type="time"
              name="time"
              placeholder="Time"
              className="date"
            />

            <input
              type="text"
              name="note"
              placeholder={t('Note')}
              className="note"
            />

            <input
              className="joinwaitingbtn "
              style={{
                width: 300,
                margin: 0,
                marginTop: 20,
              }}
              value={t('Submit Request')}
              type="submit"
            />
          </form>
        </div>
      </Modal>
      <Modal
        title={
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h4 style={{}}>{t('Contact Us')}</h4>
          </div>
        }
        centered
        width="53%"
        visible={modalIsOpenContactUs}
        onCancel={() => setIsOpenContactUs(false)}
        footer={false}
      >
        <div className="contactusContent">
          <h3 style={{ width: 'fit-content' }}>{t('Leave Us A Message')}</h3>

          <p style={{ width: 'fit-content' }}>
            {t('Please fill in the information to complete request')}
          </p>
          <form onSubmit={handleSubmitContact}>
            <input type="text" required name="name" placeholder={t('Name')} />
            <input
              type="text"
              required
              name="mobileNum"
              placeholder={t('Mobile Number')}
            />

            <textarea
              name="mesage"
              required
              placeholder={t('Message')}
            ></textarea>

            <input type="submit" value="Send" />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Details;
