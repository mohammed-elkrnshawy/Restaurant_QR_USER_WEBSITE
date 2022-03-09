import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import BestSeller from '../../../common/BestSeller';
import { useTranslation } from 'react-i18next';

export default function Categories({
  meals,
  getSubCategory,

  setComponent,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb className="col-12">
        <Breadcrumb.Item
          onClick={() => {
            setComponent('cat');
          }}
        >
          {t('Categories')}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            setComponent('sub');
          }}
        >
          {t('Sub-Categories')}{' '}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{t('Meals')}</Breadcrumb.Item>
      </Breadcrumb>
      <br />

      {meals.map((cat) => (
        <Col md={3}>
          <BestSeller
            id={cat.id}
            title={cat.name}
            subTitle={cat.description}
            imageAlt="Product"
            image={cat.image}
            imageClass="img-fluid item-img"
            price={cat.price}
            priceUnit="$"
            isNew={false}
            showPromoted={false}
            promotedVariant="dark"
            favIcoIconColor="text-danger"
            rating=""
          />
        </Col>
      ))}
    </>
  );
}
