import React from 'react';
import Item from './item';
import { useTranslation } from 'react-i18next';

export default function Category({ changeComponent, subCategory, getMeals }) {
  const { t } = useTranslation();

  return (
    <div className="categories">
      <h4>{t('Sub-Category')}</h4>
      {subCategory.map((i) => (
        <Item
          name={i.name}
          onClick={() => {
            changeComponent('meals');
            getMeals(i.id);
          }}
        />
      ))}
    </div>
  );
}
