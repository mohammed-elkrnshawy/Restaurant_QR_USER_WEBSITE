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
        <input
          className="joinwaitingbtn "
          style={{
            width: 300,
            margin: 0,
            marginTop: 20,
          }}
          value="Submit Request"
          onClick={(e) => {
            setIsOpen(false);
          }}
          type="button"
        />
      </Modal>
    </div>
  );
};

export default Details;
