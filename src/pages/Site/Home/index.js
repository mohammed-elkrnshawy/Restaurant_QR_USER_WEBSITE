import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Item from './item';
import './style.css';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';

const Index = ({ changeComponent, setId }) => {
  const [Resturant, setResturant] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setId(-1);
    getData();
  }, []);

  useEffect(() => {
    setId(-1);
    setLoading(true);
    getData();
  }, [localStorage.getItem('lang')]);

  const getData = () => {
    axios
      .get('https://restaurant-dashboard.se01.tech/api/restaurants', {
        // headers: { 'Content-Language': localStorage.getItem('lang') },
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

  const content = () => {
    return (
      <div className="homeContainer">
        {Resturant.map((i) => (
          <Item
            name={i.name}
            image={i.image}
            rating={i.rates}
            onClick={() => {
              setId(i.id);
              changeComponent('details');
            }}
          />
        ))}
      </div>
    );
  };

  const loading = () => {
    return (
      <div className="homeContainerLoading">
        <div class="hungry-3"></div>
      </div>
    );
  };

  return isLoading ? loading() : content();
};

export default Index;
