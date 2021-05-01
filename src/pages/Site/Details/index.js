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
    top: '20%',
    left: '40%',
    right: 'auto',
    bottom: 'auto',
    padding: 20,
    boxBorder: 'gray',
  },
};

const Details = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [meals, setMeals] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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

  const getData = () => {
    axios
      .get(`https://restaurant.se01.tech/api/restaurants/${props.id}`)
      .then((response) => {
        if (response.data.status == 'true') {
          console.log(response.data.data.items);

          setCategories(response.data.data.categories);
          setName(response.data.data.name);
          setPhone(response.data.data.phone);
          setEmail(response.data.data.email);
        } else {
          console.log(response);
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  const getSubCategory = (id) => {
    axios
      .get(`https://restaurant.se01.tech/api/categories/${id}`)
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
      .get(`https://restaurant.se01.tech/api/products/${id}`)
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
              backgroundImage: `url("/assets/mac.png")`,
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
            borderRadius: 10,
            padding: 2,
            margin: 5,
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
            className="changePass "
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
        <div className="discrip">{email}</div>
        {theComponent()}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h3>Waiting List</h3>
        <p className="p_">There's</p>
        <h4 className="h_">13</h4>
        <p className="p_">Guest Waiting</p>
        <div className="divider"></div>
        <h6 className="h_">You Next?</h6>
        <input
          className="changePass "
          style={{
            backgroundColor: 'white',
            width: 300,
            margin: 0,
            marginTop: 20,
          }}
          value="+ Join Waiting List"
          onClick={(e) => {
            openModal();
          }}
          type="button"
        />
      </Modal>
    </div>
  );
};

export default Details;
