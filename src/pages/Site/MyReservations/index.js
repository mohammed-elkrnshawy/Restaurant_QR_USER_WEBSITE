import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Item from './item';
import axios from 'axios';
import cogoToast from 'cogo-toast';

import './style.css';

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
    return data.length > 0
      ? data.map((i) => (
          <div className="myResContainer">
            <Item data={i} />
          </div>
        ))
      : 'No reservations';
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
