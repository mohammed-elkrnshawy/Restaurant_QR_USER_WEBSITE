import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import './style.css';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    let values = {
      name: e.target[0].value,
      phone: e.target[1].value,
      message: e.target[2].value,
    };

    axios
      .post('https://restaurant-dashboard.se01.tech/api/contact', values, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(function (response) {
        if (response.data.status == 'true') {
          cogoToast.success('request submitted');
        } else {
          cogoToast.warn('someting went wrong');
        }
      });
  };

  return (
    <div className="contactusContainer">
      <div className="contactusContent">
        <form onSubmit={handleSubmit}>
          <h3>{t('Leave Us A Message')}</h3>
          <p>{t('Please fill in the information to complete request')}</p>

          <input type="text" required name="name" placeholder={t('Name')} />
          <input
            type="text"
            required
            name="mobileNum"
            placeholder={t('Mobile Number')}
          />

          <textarea name="mesage" required placeholder="Message"></textarea>

          <input type="submit" value={t('send')} />
        </form>
      </div>
    </div>
  );
};

export default Index;
