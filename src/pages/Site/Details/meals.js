import React, { useEffect, useState } from 'react';
import Item from './item_';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from 'antd';

export default function Category({ meals, changeComponent }) {
  const { t } = useTranslation();

  return (
    <div className="categories">
      <Breadcrumb
        style={{ display: 'inline', width: '100%', marginBottom: 20 }}
      >
        <Breadcrumb.Item>
          <a onClick={() => changeComponent('category')}>{t('Categories')}</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => changeComponent('subCategory')}>
            {t('Sub-Category')}
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('Meals')}</Breadcrumb.Item>
      </Breadcrumb>

      {meals.map((i) => (
        <Item
          name={i.name}
          image={i.image}
          description={i.description}
          price={i.price}
        />
      ))}
    </div>
  );
}
