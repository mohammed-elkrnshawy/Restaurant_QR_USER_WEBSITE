import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Row,
  Col,
  Container,
  Dropdown,
  Accordion,
  Button,
  Form,
  Spinner,
} from 'react-bootstrap';

import TopSearch from './TopSearch';
import ProductBox from './ProductBox';
import CardItem from '../../../common/CardItem';
import SectionHeading from '../../../common/SectionHeading';
import FontAwesome from '../../../common/FontAwesome';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  const [fav, setFav] = useState([]);
  useEffect(() => {
    getFav();
  }, []);

  const getFav = () => {
    axios
      .get('https://restaurant-dashboard.se01.tech/api/getFavoriteRestaurants')
      .then((response) => {
        if (response.data.status == 'true') {
          setFav(response.data.data.items);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  };

  return (
    <>
      <TopSearch />

      <section className="section pt-5 pb-5 products-section">
        <Container>
          <SectionHeading
            heading={t('Popular Brands')}
            subHeading={t(
              'Top restaurants, cafes, pubs, and bars in Ludhiana, based on trends'
            )}
          />
          <Row>
            {fav.map((r) => (
              <Col md={3}>
                <div className="item">
                  <CardItem
                    title={r.name}
                    subTitle=""
                    imageAlt="Product"
                    image={r.image}
                    imageClass="img-fluid item-img"
                    linkUrl={`/home/resturant/?id=${r.id}`}
                    offerText="65% off | Use Coupon OSAHAN50"
                    time="20–25 min"
                    price="$250 FOR TWO"
                    showPromoted={true}
                    promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating={Math.floor(Number(r.rates)) || '0'}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Index;
