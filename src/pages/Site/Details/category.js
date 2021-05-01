import React, { useEffect, useState } from 'react';
import Item from './item';

export default function category({
  changeComponent,
  categories,
  setId,
  getSubCategory,
}) {
  return (
    <div className="categories">
      <h4>categories</h4>
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
