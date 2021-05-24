import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Category from './category';
import SubCategory from './subcategory';
import Meals from './meals';

import './style.css';

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
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [meals, setMeals] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [currentComponent, setCurrentComponent] = useState('category');
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
            console.log(response);
            setIsOpen(false);
            cogoToast.success('request submitted');
          } else {
            console.log(response);
            cogoToast.warn('someting went wrong');
          }
        });
    }
  };

  const getData = () => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/restaurants/${props.id}`)
      .then((response) => {
        if (response.data.status == 'true') {
          console.log(response.data.data);

          setCategories(response.data.data.categories);
          setName(response.data.data.name);
          setPhone(response.data.data.phone);
          setDescription(response.data.data.description);
          setImage(response.data.data.image);
        } else {
          console.log(response);
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const getSubCategory = (id) => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/categories/${id}`)
      .then((response) => {
        if (response.data.status == 'true') {
          console.log(response.data.data.items);

          setSubCategory(response.data.data.items);
        } else {
          console.log(response);
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const getMeals = (id) => {
    axios
      .get(`https://restaurant-dashboard.se01.tech/api/products/${id}`)
      .then((response) => {
        if (response.data.status == 'true') {
          console.log(response.data.data);

          setMeals(response.data.data.items);
        } else {
          console.log(response);
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
            <p>About</p>
          </div>
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
        <div className="discrip">{description}</div>
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
    </div>
  );
};

export default Details;
