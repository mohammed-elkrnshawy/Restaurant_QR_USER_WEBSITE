import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Item from './item';
import { useTranslation } from 'react-i18next';

export default function About({ description, location }) {
  const [address, setAddress] = useState('');
  const { t } = useTranslation();

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
        <h4>{t('Location')}</h4>
        {address || 'No Location For This Resturant'}

        <h4>{t('Description')}</h4>
        {description}
      </div>
    </div>
  );
}
