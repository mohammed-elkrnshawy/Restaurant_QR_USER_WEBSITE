import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Category from './category';
import About from './about';

import SubCategory from './subcategory';
import Meals from './meals';

import './style.css';
import Rates from './rates';

const customStyles = {
  content: {
    alignSelf: 'center',
    justifySelf: 'center',
    right: 'auto',
    bottom: 'auto',
    padding: 20,
    boxBorder: 'gray',
    inset: '20% auto auto 30%',
  },
};

const Details = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenContactUs, setIsOpenContactUs] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [meals, setMeals] = useState([]);
  const [rate, setRate] = useState(0);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '' });

  const [currentComponent, setCurrentComponent] = useState('category');
  const [selected, setSelected] = useState(1);
  const [id, setId] = useState(-1);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getData();
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
        restaurant_id: props.id,
        name: e.target[0].value,
        phone: e.target[1].value,
        count: e.target[2].value,
        date: e.target[4].value,
        time: e.target[5].value,
        notes: e.target[6].value,
      };

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
      restaurant_id: props.id,
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

  const getData = () => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/restaurants/${props.id}`)
      .then((response) => {
        if (response.data.status == 'true') {
          setCategories(response.data.data.categories);
          setName(response.data.data.name);
          setPhone(response.data.data.phone);
          setDescription(response.data.data.description);
          setImage(response.data.data.image);
          setRate(response.data.data.rates);

          setLocation({
            lat: response.data.data.lat,
            lng: response.data.data.lng,
          });
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const getSubCategory = (id) => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/categories/${id}`)
      .then((response) => {
        if (response.data.status == 'true') {
          setSubCategory(response.data.data.items);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const getMeals = (id) => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/products/${id}`)
      .then((response) => {
        if (response.data.status == 'true') {
          setMeals(response.data.data.items);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const theComponent = () => {
    switch (currentComponent) {
      case 'category':
        return (
          <Category
            changeComponent={setCurrentComponent}
            categories={categories}
            setId={setId}
            getSubCategory={getSubCategory}
          />
        );

      case 'about':
        return (
          <About
            changeComponent={setCurrentComponent}
            description={description}
            categories={categories}
            location={location}
            setId={setId}
            getSubCategory={getSubCategory}
          />
        );
      case 'rates':
        return <Rates id={props.id} overallRate={rate} />;

      case 'subCategory':
        return (
          <SubCategory
            changeComponent={setCurrentComponent}
            subCategory={subCategory}
            getMeals={getMeals}
          />
        );
      case 'meals':
        return <Meals meals={meals} />;

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
      <div className="details-panar" style={{}}>
        <div className="homeimageCont">
          <div
            className="homeimg"
            style={{
              backgroundImage: `url("${image}")`,
            }}
          ></div>
        </div>
        <h3>{name}</h3>
        <p className="hometype">fast food</p>
        <div className="homestatus"></div>

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
      </div>
      <div className="details-content">
        <div className="details-header">
          <div className="sub-nav">
            <p
              className={selected == 1 ? 'selected' : 'notSelected'}
              onClick={(e) => {
                setCurrentComponent('category');
                setSelected(1);
              }}
            >
              Categories
            </p>
          </div>
          <div className="sub-nav">
            <p
              className={selected == 2 ? 'selected' : 'notSelected'}
              onClick={(e) => {
                setCurrentComponent('about');
                setSelected(2);
              }}
            >
              About
            </p>
          </div>
          <div className="sub-nav">
            <p
              className={selected == 3 ? 'selected' : 'notSelected'}
              onClick={(e) => {
                setCurrentComponent('rates');
                setSelected(3);
              }}
            >
              Rates
            </p>
          </div>

          <div className="sub-nav-space">
            <p className="whiteSpace">__</p>
          </div>

          <input
            className="newResButton "
            style={{
              display: 'inline',
              backgroundColor: 'white',
              width: '10vw',
            }}
            value="Contact Us"
            onClick={(e) => {
              setIsOpenContactUs(true);
            }}
            type="button"
          />
          <input
            className="newResButton "
            style={{
              display: 'inline',
              backgroundColor: 'white',
            }}
            value="Make New Reservation"
            onClick={(e) => {
              openModal();
            }}
            type="button"
          />
        </div>
        {theComponent()}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="reqformContent">
          <h5>Make A New Reservation</h5>
          <p>Please fill in the information to complete your request</p>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="mobileNum" placeholder="Mobile Number" />
            <input type="text" name="people" placeholder="People" />
            <input
              type="text"
              hidden
              disabled
              style={{
                border: '#eee',

                visibility: 'hidden',
              }}
            />

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
              placeholder="Note"
              className="note"
            />

            <input
              className="joinwaitingbtn "
              style={{
                width: 300,
                margin: 0,
                marginTop: 20,
              }}
              value="Submit Request"
              type="submit"
            />
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpenContactUs}
        onRequestClose={() => setIsOpenContactUs(false)}
        style={customStyles}
      >
        <div className="contactusContent">
          <form onSubmit={handleSubmitContact}>
            <h3>Leave Us A Message</h3>
            <p>Please fill in the information to complete request</p>

            <input type="text" required name="name" placeholder="Name" />
            <input
              type="text"
              required
              name="mobileNum"
              placeholder="Mobile Number"
            />

            <textarea name="mesage" required placeholder="Message"></textarea>

            <input type="submit" value="Send" />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Details;
