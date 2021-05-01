import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Item from './item';
import './style.css';
import axios from 'axios';
import cogoToast from 'cogo-toast';

const Index = ({ changeComponent, setId }) => {
  const [Resturant, setResturant] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('https://restaurant.se01.tech/api/restaurants')
      .then((response) => {
        if (response.data.status == 'true') {
          console.log(response.data.data.items);

          setResturant(response.data.data.items);
        } else {
          console.log(response);
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  return (
    <div className="myResContainer">
      {Resturant.map((i) => (
        <Item
          name={i.name}
          onClick={() => {
            changeComponent('details');
            setId(i.id);
          }}
        />
      ))}
    </div>
  );
};

export default Index;
