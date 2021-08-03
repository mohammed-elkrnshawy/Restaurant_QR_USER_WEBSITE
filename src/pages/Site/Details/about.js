import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Item from './item';
import { useTranslation } from 'react-i18next';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => (
  <div>
    <i class="fas fa-map-marker-alt" style={{ width: 150, height: 50 }}></i>
  </div>
);

export default function About({ description, location }) {
  const [address, setAddress] = useState('');
  const { t } = useTranslation();
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyBKHwO4kHCnokqGtz8gsFRqUFOYC0cKOnA`
      )
      .then((result) => {
        defaultProps.center = {
          lat: location.lat,
          lng: location.lng,
        };
        setAddress(result.data.results[0].formatted_address);
      });
  }, []);
  return (
    <div className="categories">
      <h4
        style={{
          marginBottom: 16,
          fontSize: 16,

          fontWeight: 'bolder',
          marginBlockStart: 16,
        }}
      >
        {t('Description')}
      </h4>
      <h4 style={{ marginTop: 0 }}>{description}</h4>
      <div className="discrip" style={{ height: address ? '200vh' : '10vh' }}>
        <h4
          style={{
            fontSize: 16,
            fontWeight: 'bolder',
          }}
        >
          {t('Location')}
        </h4>
        <h4 style={{ marginTop: 0 }}>
          {' '}
          {address || 'No Location For This Resturant'}
        </h4>

        {address ? (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyBKHwO4kHCnokqGtz8gsFRqUFOYC0cKOnA' /* YOUR KEY HERE */,
            }}
            defaultCenter={{
              lat: location.lat,
              lng: location.lng,
            }}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={location.lat}
              lng={location.lng}
              text="My Marker"
            />
          </GoogleMapReact>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
