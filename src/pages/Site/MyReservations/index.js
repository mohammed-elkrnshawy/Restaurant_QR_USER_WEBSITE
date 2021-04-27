import React from 'react';
import { useHistory } from 'react-router-dom';
import Item from './item';
import './style.css';

const Index = () => {
  const history = useHistory();

  return (
    <div className="myResContainer">
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default Index;
