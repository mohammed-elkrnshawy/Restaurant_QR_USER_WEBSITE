import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Item from './item';
import './style.css';
import axios from 'axios';
import cogoToast from 'cogo-toast';

const Index = ({ changeComponent, setId }) => {
  const [Resturant, setResturant] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('https://restaurant-dashboard.se01.tech/api/restaurants')
      .then((response) => {
        if (response.data.status == 'true') {
          setResturant([...response.data.data.items]);
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
              changeComponent('details');
              setId(i.id);
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
