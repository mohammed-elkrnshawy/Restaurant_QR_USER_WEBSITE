import React, { useEffect, useState } from 'react';
import Item from './item_';
import { useTranslation } from 'react-i18next';

export default function Category({ meals }) {
  const { t } = useTranslation();

  return (
    <div className="categories">
      <h4>{t('Meals')}</h4>
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
