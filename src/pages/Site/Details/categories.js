import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import ProductBox from '../../../common/ProductBox';
import { useTranslation } from 'react-i18next';

export default function Categories({
  categories,
  getSubCategory,
  setComponent,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb className="col-12">
        <Breadcrumb.Item active>{t('Categories')}</Breadcrumb.Item>
      </Breadcrumb>
      <br />

      {categories.map((cat) => (
        <Col
          md={3}
          onClick={() => {
            getSubCategory(cat.id);
            setComponent('sub');
          }}
        >
          <ProductBox
            boxClass="osahan-category-item"
            title={cat.name}
            image={cat.image}
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </Col>
      ))}
    </>
  );
}
