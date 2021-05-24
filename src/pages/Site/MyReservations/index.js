import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Item from './item';
import axios from 'axios';
import cogoToast from 'cogo-toast';

import './style.css';

const Index = () => {
  const [data, setData] = useState([]);
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
          console.log('-----', response.data.data);
          return response.data.data;
        } else {
          console.log(response);
          cogoToast.warn('Something Went Wrong');
        }
      })
      .then((res) => {
        console.log(res);
        setData(res);
      });
  };

  return (
    <div className="myResContainer">
      {data && data.length
        ? data.map((i) => <Item data={i} />)
        : 'No reservations'}
    </div>
  );
};

export default Index;
