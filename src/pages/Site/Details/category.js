import React, { useEffect, useState } from 'react';
import Item from './item';
import { useTranslation } from 'react-i18next';

export default function Category({
  changeComponent,
  categories,
  setId,
  getSubCategory,
}) {
  const { t } = useTranslation();

  return (
    <div className="categories">
      <h4>{t('Categories')}</h4>
      {categories.map((i) => (
        <Item
          name={i.name}
          image={i.image}
          onClick={() => {
            changeComponent('subCategory');
            setId(i.id);
            getSubCategory(i.id);
          }}
        />
      ))}
    </div>
  );
}
