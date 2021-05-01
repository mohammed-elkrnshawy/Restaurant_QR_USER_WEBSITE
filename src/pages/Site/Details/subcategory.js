import React from 'react';
import Item from './item';

export default function category({ changeComponent, subCategory, getMeals }) {
  return (
    <div className="categories">
      <h4>Sub-Category</h4>
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
