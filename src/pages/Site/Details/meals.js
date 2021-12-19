import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import BestSeller from '../../../common/BestSeller';

export default function Categories({
  meals,
  getSubCategory,

  setComponent,
}) {
  return (
    <>
      <Breadcrumb className="col-12">
        <Breadcrumb.Item
          onClick={() => {
            setComponent('cat');
          }}
        >
          Categories
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            setComponent('sub');
          }}
        >
          Sub-Categories
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Meals</Breadcrumb.Item>
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
