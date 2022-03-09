import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Row, Col, Container } from 'react-bootstrap';

import CardItem from '../../../common/CardItem';

import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';
import './style.css';

const Index = ({ changeComponent, setId, id }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [Resturant, setResturant] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    console.log(params);

    let query = `https://restaurant-dashboard.se01.tech/api/restaurants?${
      params.city != '' && params.city ? 'city_id=' + params.city : ''
    }${
      params.category != '' && params.category
        ? '&main_category=' + params.category
        : ''
    }
    ${
      // category != '' && category[0] == 's'
      //   ? '&sub_category=' + category.slice(1)
      ''
    }
    ${params.search != '' && params.search ? '&name=' + params.search : ''}`;

    setLoading(true);
    axios
      .get(query, {
        headers: {
          'Content-Language':
            localStorage.getItem('lang') &&
            localStorage.getItem('lang').search('ar') >= 0
              ? 'ar'
              : 'en',
        },
      })
      .then((response) => {
        if (response.data.status == 'true') {
          setResturant([...response.data.data.items]);
          console.log(Resturant);
          setLoading(false);
        } else {
          cogoToast.warn('Something Went Wrong');
        }
      });
  }, [localStorage.getItem('lang')]);

  const content = () => {
    return (
      <>
        <section className="section pt-5 pb-5 products-listing">
          <Container>
            <Row>
              <Col md={12}>
                <Row>
                  {Resturant.map((r) => (
                    <Col md={3} sm={6} className="mb-4 pb-2">
                      {/* <CardItem
                        title={r.name}
                        subTitle="North Indian • American • Pure veg"
                        imageAlt="Product"
                        image={r.image}
                        imageClass="img-fluid item-img col-12 "
                        linkUrl={`/home/resturant/?id=${r.id}`}
                        offerText="65% off | Use Coupon OSAHAN50"
                        time="15–25 min"
                        price="$100 FOR TWO"
                        showPromoted={true}
                        promotedVariant="dark"
                        favIcoIconColor="text-danger"
                        rating={Math.floor(Number(r.rates))}
                      /> */}
                      <div className="item">
                        <CardItem
                          title={r.name}
                          subTitle="North Indian • American • Pure veg"
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
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  };

  return content();
};

export default Index;
