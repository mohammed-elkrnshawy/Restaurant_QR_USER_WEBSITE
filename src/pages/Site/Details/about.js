import React from 'react';
import Icofont from 'react-icofont';

import { useTranslation } from 'react-i18next';

export default function About({ description, address, phone }) {
  const { t } = useTranslation();

  return (
    <div>
      <div id="restaurant-info" className="bg-white rounded shadow-sm p-4 mb-4">
        <div className="address-map float-right ml-5">
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                title="addressMap"
                width="300"
                height="170"
                id="gmap_canvas"
                src={`https://maps.google.com/maps?q=${address}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
              ></iframe>
            </div>
          </div>
        </div>
        <h5 className="mb-4">{t('Restaurant Info')}</h5>
        <p className="mb-3">{address}</p>
        <p className="mb-2 text-black">
          <Icofont icon="phone-circle text-primary mr-2" />
          {phone}
        </p>
        <p className="mb-2 text-black">
          <Icofont icon="email text-primary mr-2" /> {}
        </p>
        <br />

        <hr className="clearfix" />

        <br />
        <h5 className="mt-4 mb-4">{t('More Info')}</h5>
        <p className="mb-3">{description}</p>
      </div>
    </div>
  );
}
