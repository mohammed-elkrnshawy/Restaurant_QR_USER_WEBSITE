import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Item from './item';

export default function About({ description, location }) {
  const [address, setAddress] = useState('');
  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyBKHwO4kHCnokqGtz8gsFRqUFOYC0cKOnA`
      )
      .then((result) => {
        setAddress(result.data.results[0].formatted_address);
      });
  }, []);
  return (
    <div className="categories">
      <div className="discrip">
        <h4>Location</h4>
        {address || 'No Location For This Resturant'}

        <h4>Description</h4>
        {description}
      </div>
    </div>
  );
}
